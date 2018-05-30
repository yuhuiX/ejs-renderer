'use strict';

/**
 * @name getTemplateFileFromObj
 * @description gets the '_templateFile' from target object.
 *    If not available on the first level, this will go through each object
 *    values and tries to retrieve the '_templateFile' from it.
 * @param {object} obj the object from which the '_templateFile' should be
 *    retrieved
 * @return {string|undefined} either the found value of _templateFile, or
 *    undefined if it is not available
 */
function getTemplateFileFromObj(obj) {
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const shallowOutput = obj._templateFile;
    if (shallowOutput) {
      return shallowOutput;
    } else {
      const keys = Object.keys(obj);
      let deepOutput;

      for (let i = 0; i < keys.length; i ++) {
        deepOutput = getTemplateFileFromObj(obj[keys[i]], true);
        if (deepOutput) {
          break;
        }
      }

      return deepOutput;
    }
  }
}

module.exports = getTemplateFileFromObj;
