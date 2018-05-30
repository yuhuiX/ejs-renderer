'use strict';

const Promise = require('bluebird');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const getTemplateFileFromContent = require('./getTemplateFileFromObj');
const {fatal} = require('../helper');

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
appModule.treatArgsInput = require('./treatArgsInput')(appModule);

module.exports = appModule;


/**
 * @function
 * @name renderContentFile
 * @description render the content file, to the destination directory
 * @param {string} contentFileAbsPath - absolute path of the content file
 * @param {string} contentFilePath - path of the destination file, relative to
 *    destination directory
 * @return {Promise}
 */
function renderContentFile(contentFileAbsPath, contentFilePath) {
  return new Promise((resolve) => {
    // TODO: function checkFileExtension
    if (contentFileAbsPath.endsWith('.js')) {
      const data = require(contentFileAbsPath);
      const relativeTemplateFile = getTemplateFileFromContent(data);

      if (!relativeTemplateFile) {
        fatal(`no templateFile found in ${JSON.stringify(data)}`);
      }

      const templateFile = path.resolve(
        process.cwd(),
        appModule.argsTemplateFolder,
        relativeTemplateFile
      );

      if (!templateFile) {
        appModule.helper.fatal('template not defined for file ' + templateFile);
      } else {
        ejs.renderFile(templateFile, data, options, (err, str) => {
          if (err) {
            appModule.helper.log(err);
            appModule.helper.fatal('ejs.renderFile error');
          }

          const destFileName = contentFilePath.replace(/.js$/, '');
          appModule.writeToFile(destFileName, str).then(resolve);
        });
      }
    } else {
      appModule.helper.error(`extension of ${contentFileAbsPath} is not .js`);
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

      let checkFilePromise = Promise.resolve();
      files.forEach((file) => {
        checkFilePromise = checkFilePromise.then(() => {
          return appModule.checkFile(path.resolve(
            process.cwd(), appModule.argsContentFolder
          ), file);
        });
      });
    });
  } else if (appModule.argsContentFile) {
    appModule.checkFile(path.resolve(
      process.cwd(), path.dirname(appModule.argsContentFile)
    ), path.basename(appModule.argsContentFile));
  } else {
    appModule.helper.fatal('fs.readdir error');
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
