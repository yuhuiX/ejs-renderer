'use strict';

const {log} = require('../global/console');

const helperModule = {
  fatal,
  log: (...args) => {
    return log(...args);
  },
};

module.exports = helperModule;


/**
 * @function
 * @name fatal
 * @description stop the application by logging the error message
 * @param {string} message - message to be displayed
 * @return {undefined}
 */
function fatal(message) {
  if (message) {
    helperModule.log(message);
  }
  process.exit(1);
}
