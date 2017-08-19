'use strict';

const {getRandomInvalidFile} = require('../data');
const {GIVEN, WHEN} = require('../steps');

/**
 * @memberof tests.error
 * @function
 * @name case1
 * @description
 * GIVEN the destination folder is removed<br>
 * WHEH I want to render 1 file with wrong extension<br>
 * AND indicate the content file with -i<br>
 * AND indicate the template directory with -t<br>
 * AND indicate the destination directory with -o<br>
 * THEN the command should not return any output<br>
 * AND the command should return an error message indicating the extension is
 * wrong<br>
 */
module.exports = () => {
  it('case1', (done) => {
    const {input} = getRandomInvalidFile();
    GIVEN.removeOutput().then(() => {
      return WHEN.render('-i', input, '-t', '-o', false, '',
`extension of ${input} is not .js
`);
    }).catch((err) => {
      fail(err);
    }).finally(done);
  });
};
