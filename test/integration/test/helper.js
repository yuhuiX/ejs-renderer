'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const Promise = require('bluebird');

const helperModule = {
  exec,
  readdir: Promise.promisify(fs.readdir),
  readFile: Promise.promisify(fs.readFile),
  stat: Promise.promisify(fs.stat),
};

module.exports = helperModule;

/**
 * @description execute a command with child_process.exec and return a Promise
 * @param {string} command - bash command
 * @return {Promise}
 */
function exec(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          stdout,
          stderr,
        });
      }
    });
  });
}
