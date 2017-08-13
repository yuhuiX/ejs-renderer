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
      const value = obj[arg];
      appModule[arg] = value;
      if (arg === 'argsInput') {
        appModule.treatArgsInput(value);
      } else if (arg === 'argsOutput') {
        appModule.argsDestFolder = value;
      }
    });
  };
};
