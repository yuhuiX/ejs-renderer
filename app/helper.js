'use strict';

const util = require('util');

const helperModule = {
  fatal,
  log,
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

/**
 * @function
 * @name log
 * @description log a message
 * @param {string} message - message to be displayed
 * @return {undefined}
 */
function log(message) {
  util.log(message);
}
