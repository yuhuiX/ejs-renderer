'use strict';

const {validDirectory, validFiles} = require('../data');
const {GIVEN, WHEN, THEN} = require('../steps');

/**
 * @memberof tests.directory
 * @function
 * @name case7
 * @description
 * GIVEN the destination folder is removed<br>
 * WHEH I want to render 1 directory<br>
 * AND indicate the content file with --input<br>
 * AND indicate the template directory with --templateDirectory<br>
 * AND indicate the destination directory with -o<br>
 * THEN the command should not return any output<br>
 * AND the command should not return any error<br>
 * AND the rendered file should be the only in the destination directory<br>
 * AND the rendered file should have expected name<br>
 * AND the rendered file should have expected content<br>
 */
module.exports = () => {
  it('case7', (done) => {
    GIVEN.removeOutput().then(() => {
      return WHEN.render('--input', validDirectory, '--templateDirectory', '-o',
        false, '', '');
    }).then(() => {
      return THEN.readOutput(validFiles);
    }).catch((err) => {
      fail(err);
    }).finally(done);
  });
};
