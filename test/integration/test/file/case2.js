'use strict';

const {getRandomValidFile} = require('../data');
const {GIVEN, WHEN, THEN} = require('../steps');

/**
 * @memberof tests.file
 * @function
 * @name case2
 * @description
 * GIVEN the destination folder is removed<br>
 * WHEH I want to render 1 file<br>
 * AND indicate the content file with -i<br>
 * AND indicate the template directory with -t<br>
 * AND indicate the destination directory with -output<br>
 * THEN the command should not return any output<br>
 * AND the command should not return any error<br>
 * AND the rendered file should be the only in the destination directory<br>
 * AND the rendered file should have expected name<br>
 * AND the rendered file should have expected content<br>
 */
module.exports = () => {
  it('case2', (done) => {
    const inputFile = getRandomValidFile();
    GIVEN.removeOutput().then(() => {
      return WHEN
        .render('-i', inputFile.input, '-t', '--output', false, '', '');
    }).then(() => {
      return THEN.readOutput([inputFile]);
    }).catch((err) => {
      fail(err);
    }).finally(done);
  });
};
