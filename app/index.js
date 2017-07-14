'use strict';

const Promise = require('bluebird');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const helper = require('./helper');
const getOptions = require('./getOptions');


let {
  argsContentFile,
  argsContentFolder,
  argsDestFolder,
  argsTemplateFolder,
} = getOptions();


// ejs options
const options = {};

let renderFilePromise = Promise.resolve();


/**
 * @function
 * @name checkFile
 * @description check whether the path exists, and whether the given path
 *    points to a file or not.
 *    If file exists, then call renderContentFile with the filePath.
 *    Otherwise, stop the program and indicate the error
 * @param {string} filePath - path of the target file, relative to
 *    process.cwd()
 */
function checkFile(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      helper.log(err);
      helper.fatal('fs.stat error in checkFile()');
    }

    if (stats.isFile()) {
      renderFilePromise = renderFilePromise.then(() => {
        return renderContentFile(filePath);
      });
    } else {
      helper.fatal(filePath + ' is not a file');
    }
  });
}

/**
 * @function
 * @name writeToFile
 * @description check whether the path exists, and whether the given path
 *    points to a file or not.
 *    If file exists, then call renderContentFile with the filePath.
 *    Otherwise, stop the program and indicate the error
 * @param {string} destFileName - path of the destination file, relative to
 * @param {string} content - content of the destination file
 */
function writeToFile(destFileName, content) {
  return new Promise((resolve) => {
    // const dest = argsDestFolder + destFileName;
    const dest = path.resolve(process.cwd(), argsDestFolder, destFileName);
    fse.ensureFile(dest, (err) => {
      if (err) {
        helper.log('fse.ensureFile error');
        return helper.fatal(err);
      } else {
        fs.writeFile(dest, content, (err) => {
          if (err) {
            helper.log('fs.writeFile error');
            return helper.fatal(err);
          }

          resolve();
        });
      }
    });
  });
}

function renderContentFile(contentFile) {
  return new Promise((resolve) => {
    if (contentFile.endsWith('.js')) {
      contentFile = path.resolve(process.cwd(), contentFile);
      const data = require(contentFile);

      const templateFile = path.resolve(
        process.cwd(), argsTemplateFolder, data._templateFile
      );

      if (!templateFile) {
        helper.fatal('template not defined for file ' + contentFile);
      } else {
        ejs.renderFile(templateFile, data, options, (err, str) => {
          if (err) {
            helper.log(err);
            helper.fatal('ejs.renderFile error');
          }

          fs.stat(contentFile, (err) => {
            if (err) {
              helper.log(err);
              helper.fatal('fs.stat error in renderContentFile');
            }

            let destFileName = contentFile.split('/');
            destFileName = destFileName[destFileName.length - 1]
              .replace('.js', '');
            writeToFile(destFileName, str).then(resolve);
          });
        });
      }
    } else {
      helper.fatal('extension of --config is not .js');
    }
  });
}


if (argsContentFolder) {
  fs.readdir(argsContentFolder, (err, files) => {
    if (err) {
      helper.log(err);
      helper.fatal('fs.readdir error');
    }

    files.forEach((file) => {
      checkFile(path.resolve(process.cwd(), argsContentFolder, file));
    });
  });
} else if (argsContentFile) {
  checkFile(argsContentFile);
}
