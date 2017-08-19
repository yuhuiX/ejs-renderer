'use strict';

const fs = require('fs');
const path = require('path');

const {fatal} = require('../helper');

module.exports = (appModule) => {
  /**
   * @function
   * @name treatArgsInput
   * @description set appModule.argsContentFile or appModule.argsContentFolder,
   *    depending on the given value
   * @param {string} value - value of argsInput
   * @return {undefined}
   */
  return (value) => {
    const argsInput = path.resolve(
      process.cwd(), value
    );
    const stats = fs.statSync(argsInput);
    if (stats.isFile()) {
      appModule.argsContentFile = value;
    } else if (stats.isDirectory()) {
      appModule.argsContentFolder = value;
    } else {
      fatal(`input file/directory ${value} does not exist`);
    }
  };
};
