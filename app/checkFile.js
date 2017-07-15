'use strict';

const fs = require('fs');

module.exports = (appModule) => {
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
  return (filePath) => {
    let renderFilePromise = Promise.resolve();
    fs.stat(filePath, (err, stats) => {
      if (err) {
        appModule.helper.log(err);
        appModule.helper.fatal('fs.stat error in checkFile()');
      }

      if (stats.isFile()) {
        renderFilePromise = renderFilePromise.then(() => {
          return appModule.renderContentFile(filePath);
        });
      } else {
        appModule.helper.fatal(filePath + ' is not a file');
      }
    });
  };
};
