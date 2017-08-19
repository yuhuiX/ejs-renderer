'use strict';

const path = require('path');

const inputDirectory = 'test/integration/content/';

const invalidFile0 = {
  input:
    path.resolve(inputDirectory, '../content-wrong-extension', 'test.html'),
};

const validFile0 = {
  input: path.resolve(inputDirectory, 'test.html.js'),
  outputFileName: 'test.html',
  outputContent:
`

<h1>H1</h1>


`,
};

const validFile1 = {
  input: path.resolve(inputDirectory, 'test1.html.js'),
  outputFileName: 'test1.html',
  outputContent:
`

<h1>H1</h1>


<h2>H2</h2>

`,
};

const validFiles = [
  validFile0,
  validFile1,
];

module.exports = {
  getRandomInvalidFile,
  getRandomValidFile,
  validDirectory: inputDirectory,
  validFiles,
};

/**
 * @description get random invalid file
 * @return {any} valid file
 */
function getRandomInvalidFile() {
  return invalidFile0;
}

/**
 * @description get random valid file
 * @return {any} valid file
 */
function getRandomValidFile() {
  const validFilesLength = validFiles.length;
  const randomIndex = Math.floor(validFilesLength * Math.random());

  return validFiles[randomIndex];
}
