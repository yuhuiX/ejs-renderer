'use strict';

const Promise = require('bluebird');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

// ejs options
const options = {};


const appModule = {
  argsContentFile: '',
  argsContentFolder: '',
  argsDestFolder: '',
  argsTemplateFolder: '',

  getOptions: require('./getOptions'),
  helper: require('../helper'), // TODO: move to each function

  renderContentFile,
  start,
  writeToFile,
};

appModule.checkFile = require('./checkFile')(appModule);
appModule.setArgs = require('./setArgs')(appModule);

module.exports = appModule;


/**
 * @function
 * @name renderContentFile
 * @description render the content file, to the destination directory
 * @param {string} contentFile - path of the destination file, relative to
 *    process.cwd()
 * @return {Promise}
 */
function renderContentFile(contentFile) {
  return new Promise((resolve) => {
    if (contentFile.endsWith('.js')) {
      contentFile = path.resolve(process.cwd(), contentFile);
      const data = require(contentFile);

      const templateFile = path.resolve(
        process.cwd(), appModule.argsTemplateFolder, data._templateFile
      );

      if (!templateFile) {
        appModule.helper.fatal('template not defined for file ' + contentFile);
      } else {
        ejs.renderFile(templateFile, data, options, (err, str) => {
          if (err) {
            appModule.helper.log(err);
            appModule.helper.fatal('ejs.renderFile error');
          }

          fs.stat(contentFile, (err) => {
            if (err) {
              appModule.helper.log(err);
              appModule.helper.fatal('fs.stat error in renderContentFile');
            }

            let destFileName = contentFile.split('/');
            destFileName = destFileName[destFileName.length - 1]
              .replace('.js', '');
            appModule.writeToFile(destFileName, str).then(resolve);
          });
        });
      }
    } else {
      appModule.helper.fatal(`extension of ${contentFile} is not .js`);
    }
  });
}

/**
 * @function
 * @name start
 * @description start the application.
 *    It gets the parameters, and render files from given content folder,
 *    if indicated,
 *    or render only from given content file
 * @return {undefined}
 */
function start() {
  appModule.setArgs(appModule.getOptions());

  if (appModule.argsContentFolder) {
    fs.readdir(appModule.argsContentFolder, (err, files) => {
      if (err) {
        appModule.helper.log(err);
        appModule.helper.fatal('fs.readdir error');
      }

      files.forEach((file) => {
        appModule.checkFile(path.resolve(
          process.cwd(), appModule.argsContentFolder, file
        ));
      });
    });
  } else if (appModule.argsContentFile) {
    appModule.checkFile(appModule.argsContentFile);
  }
}

/**
 * @function
 * @name writeToFile
 * @description check whether the path exists, and whether the given path
 *    points to a file or not.
 *    If file exists, then call renderContentFile with the filePath.
 *    Otherwise, stop the program and indicate the error
 * @param {string} destFileName - name of the destination file
 * @param {string} content - content of the destination file
 * @return {Promise}
 */
function writeToFile(destFileName, content) {
  return new Promise((resolve) => {
    // const dest = argsDestFolder + destFileName;
    const dest = path.resolve(
      process.cwd(), appModule.argsDestFolder, destFileName
    );
    fse.ensureFile(dest, (err) => {
      if (err) {
        appModule.helper.log('fse.ensureFile error');
        return appModule.helper.fatal(err);
      } else {
        fs.writeFile(dest, content, (err) => {
          if (err) {
            appModule.helper.log('fs.writeFile error');
            return appModule.helper.fatal(err);
          }

          resolve();
        });
      }
    });
  });
}
