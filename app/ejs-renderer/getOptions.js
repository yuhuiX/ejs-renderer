'use strict';

const helper = require('../helper');
const argv = require('minimist')(process.argv.slice(2));

module.exports = getOptions;


/**
 * @function
 * @name getOptions
 * @description get app parameter values for
 *    -i, --input
 *    -o, --output
 *    -t, --templateFolder ,
 * @return {object} obj
 */
function getOptions() {
  let argsInput = argv.i || argv.input;
  let argsOutput = argv.o || argv.output;
  let argsTemplateFolder = argv.t || argv.templateFolder;

  const errorMessages = [];

  if (!argsInput) {
    errorMessages.push('Please provide -i or --input for input folder/file');
  }
  if (!argsOutput) {
    errorMessages.push('Please provide -o or --output for output folder');
  }
  if (!argsTemplateFolder) {
    errorMessages.push(
      'Please provide -t or --templateFolder to indicate the template folder'
    );
  }

  if (errorMessages.length) {
    return helper
      .fatal(errorMessages.join('; '));
  } else {
    return {
      argsInput,
      argsOutput,
      argsTemplateFolder,
    };
  }
}
