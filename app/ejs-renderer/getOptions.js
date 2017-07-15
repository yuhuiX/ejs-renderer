'use strict';

const helper = require('../helper');

module.exports = getOptions;


/**
 * @function
 * @name getOptions
 * @description get app parameter values for
 *    --contentFile ,
 *    --contentFolder ,
 *    --destFolder ,
 *    --templateFolder ,
 * @return {object} obj
 */
function getOptions() {
  let {
    argsContentFile,
    argsContentFolder,
    argsDestFolder,
    argsTemplateFolder,
  } = {};

  const args = process.argv;
  args.forEach((val, index) => {
    if (val === '--contentFile' && args[index + 1]) {
      argsContentFile = args[index + 1];
    }
    if (val === '--contentFolder' && args[index + 1]) {
      argsContentFolder = args[index + 1];
    }
    if (val === '--destFolder' && args[index + 1]) {
      argsDestFolder = args[index + 1];
    }
    if (val === '--templateFolder' && args[index + 1]) {
      argsTemplateFolder = args[index + 1];
    }
  });

  if (
    !(
      (
        argsContentFile && argsContentFile.length ||
        argsContentFolder && argsContentFolder.length
      ) &&
      argsDestFolder && argsDestFolder.length &&
      argsTemplateFolder && argsTemplateFolder.length
    )
  ) {
    return helper
      .fatal('Please specify either --argsContentFile or --argsContentFolder');
  } else {
    return {
      argsContentFile,
      argsContentFolder,
      argsDestFolder,
      argsTemplateFolder,
    };
  }
}
