'use strict';

const args = process.argv;

let argsConfigFile;
let argsConfigFolder;
let argsDestFolder = './dist/';

args.forEach((val, index) => {
  if (val === '--configFile' && args[index + 1]) {
    argsConfigFile = args[index + 1];
  }
  if (val === '--configFolder' && args[index + 1]) {
    argsConfigFolder = args[index + 1];
  }
  if (val === '--destFolder' && args[index + 1]) {
    argsDestFolder = args[index + 1];
  }
});

if (
  !(argsConfigFile && argsConfigFile.length &&
  argsConfigFolder && argsConfigFolder.length)
) {
  return helper
    .log('Please specify either --argsConfigFile or --argsConfigFolder');
}


const Promise = require('bluebird');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const helper = require('./helper');

// ejs options
const options = {};

let renderFilePromise = Promise.resolve();


function checkFile(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      helper.log(err);
      helper.fatal('fs.stat error');
    }

    if (stats.isFile()) {
      renderFilePromise = renderFilePromise.then(() => {
        return renderConfigFile(filePath);
      });
    } else {
      helper.fatal(filePath + ' is not a file');
    }
  });
}

function writeToFile(destFileName, content) {
  return new Promise((resolve) => {
    const dest = argsDestFolder + destFileName;
    fse.ensureFile(dest, (err) => {
      if (err) {
        helper.log('fse.ensureFile error');
        return helper.fatal(err);
      } else {
        fs.writeFile(dest, content, (err) => {
          if (err) {
            helper.log('fs.writeFile error');
            return helper.fatal(err);
          }

          resolve();
        });
      }
    });
  });
}

function renderConfigFile(configFile) {
  return new Promise((resolve) => {
    if (configFile.endsWith('.js')) {
      configFile = path.resolve(process.cwd(), configFile);
      const data = require(configFile);

      const templateFile = data._templateFile;

      if (!templateFile) {
        helper.fatal('template not defined for file ' + configFile);
      } else {
        ejs.renderFile(templateFile, data, options, (err, str) => {
          if (err) {
            helper.log(err);
            helper.fatal('ejs.renderFile error');
          }

          fs.stat(configFile, (err) => {
            if (err) {
              helper.log(err);
              helper.fatal('fs.stat error');
            }

            let destFileName = configFile.split('/');
            destFileName = destFileName[destFileName.length - 1]
              .replace('.js', '');
            writeToFile(destFileName, str).then(resolve);
          });
        });
      }
    } else {
      helper.fatal('extension of --config is not .js');
    }
  });
}


if (argsConfigFolder) {
  fs.readdir(argsConfigFolder, (err, files) => {
    if (err) {
      helper.log(err);
      helper.fatal('fs.readdir error');
    }

    files.forEach((file) => {
      checkFile(argsConfigFolder + file);
    });
  });
} else if (argsConfigFile) {
  checkFile(argsConfigFile);
}
