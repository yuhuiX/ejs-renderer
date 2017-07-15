'use strict';

module.exports = (appModule) => {
  /**
   * @function
   * @name setArgs
   * @description set the arguments to the application
   * @param {object} obj - parameter object from getOptions()
   * @return {undefined}
   */
  return (obj) => {
    Object.keys(obj).forEach((arg) => {
      appModule[arg] = obj[arg];
    });
  };
};
