'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

module.exports = (appModule) => {
  /**
   * @function
   * @name checkFile
   * @description check whether the path exists, and whether the given path
   *    points to a file or not.
   *    If file exists, then call renderContentFile with the filePath.
   *    Otherwise, stop the program and indicate the error
   * @param {string} direcotryPath - absolute path of the directory of the file
   * @param {string} filePath - path of the target file, relative to
   *    direcotryPath
   * @return {undefined|Promise}
   */
  return (direcotryPath, filePath) => {
    const absFilePath = path.resolve(direcotryPath, filePath);
    return new Promise((resolve, reject) => {
      let renderFilePromise = Promise.resolve();
      fs.stat(absFilePath, (err, stats) => {
        if (err) {
          appModule.helper.log(err);
          appModule.helper.fatal('fs.stat error in checkFile()');
        }

        if (stats.isFile()) {
          renderFilePromise = renderFilePromise.then(() => {
            return appModule.renderContentFile(absFilePath, filePath)
              .then(resolve, reject);
          });
        } else {
          appModule.helper.fatal(absFilePath + ' is not a file');
        }
      });
    });
  };
};
