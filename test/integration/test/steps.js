'use strict';

const {log} = require('console');
const path = require('path');
const Promise = require('bluebird');

const {exec, readdir, readFile, stat} = require('./helper');

/**
 * @namespace tests
 */

/**
 * @namespace steps
 */

const output = 'test/integration/dist';
const template = 'test/integration/templates';


const GIVEN = {
  removeOutput,
};

const WHEN = {
  render,
};

const THEN = {
  readOutput,
};

const stepsModule = {
  GIVEN,
  WHEN,
  THEN,
};

module.exports = stepsModule;

/**
 * read and validate output files
 * @param {object[]} outputFiles
 * @return {Promise}
 */
function readOutput(outputFiles) {
  return readdir(output).then((files) => {
    expect(files.length).toBe(outputFiles.length);

    const promises = [];
    outputFiles.forEach((file, i) => {
      const index = i;
      expect(files[index]).toBe(file.outputFileName);

      promises.push(
        readFile(path.resolve(output, files[index]), 'utf8')
          .then((data) => {
            expect(data).toBe(file.outputContent);
          })
      );
    });

    return Promise.all(promises);
  });
}

/**
 * @memberof steps
 * @description remove output directory
 * @param {string} path
 * @return {Promise}
 */
function removeOutput() {
  const path = output;
  return exec(`rm -rf ${path}`)
    .then(() => {
      return stat(path);
    })
    .then(() => {}, (err) => {
      expect(err.code).toBe('ENOENT');
    })
  ;
}

/**
 * @memberof steps
 * @description render files by command
 * @param {string} inputParam - -i or --input
 * @param {string} input - input value
 * @param {string} templateParam - -t or --template
 * @param {string} outputParam - -o or --outpu
 * @param {boolean} skipExit - skip process.exit error by adding || true
 * @param {string} expectedStdout
 * @param {string} expectedStderr
 * @return {Promise}
 */
function render(
  inputParam, input, templateParam, outputParam, skipExit,
  expectedStdout, expectedStderr
) {
  const command =
    `node app/index.js ${inputParam} ${input} ` +
    `${templateParam} ${template} ${outputParam} ${output}` +
    `${skipExit ? ' || true' : ''}`
  ;
  log(`========== RENDER COMMAND ==========
${command}`);

  return exec(command).then(({stdout, stderr}) => {
    expect(stdout).toBe(expectedStdout, 'stdout');
    expect(stderr).toBe(expectedStderr, 'stderr');
  });
}
