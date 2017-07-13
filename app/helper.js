'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const util = require('util');

const helperModule = {
  execute,
  fatal,
  log,
  patchVersion,
  readFile,
  readFileAsJson,
};


function execute(commands, callbackStdout) {
  exec(commands, (error, stdout, stderr) => {
    if (error) {
      helperModule.fatal('exec error: ' + error);
      return;
    }

    if (stdout) {
      helperModule.log('stdout:\n' + stdout);
      if (callbackStdout) {
      callbackStdout(stdout);
      }
    }
    if (stderr) {
      helperModule.log('stderr:\n' + stderr);
    }
  });
}

function fatal(message) {
  if (message) {
    helperModule.log(message);
  }
  process.exit(1);
}

function log(message) {
  util.log(message);
}

function patchVersion(version) {
  const versions = version.split('.');
  versions[2] = Number(versions[2]) + 1;

  return versions.join('.');
}

function readFile(file) {
  file = path.resolve(process.cwd(), file);

  try {
    return fs.readFileSync(file, {encoding: 'utf8'});
  } catch (e) {
    fatal('Cannot read ' + file + '\n' + e.message);
  }
}

function readFileAsJson(file) {
  let output = helperModule.readFile(file);
  try {
    output = JSON.parse(output);
  } catch (e) {
    fatal('Cannot read the specified file ' + file + ' as JSON: ' + e.message);
  }
  return output;
}


module.exports = helperModule;
