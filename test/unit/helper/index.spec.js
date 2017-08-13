'use strict';

const console = require('../modules').mocked.console();
const helper = require('../modules').mocked.helper();

describe('helper module ->', () => {
  describe('could fatal()', () => {
    it('if message provided', () => {
      process.exit = jasmine.createSpy('exit');
      spyOn(helper, 'log');

      helper.fatal('message');
      expect(helper.log).toHaveBeenCalledWith('message');
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('if no message provided', () => {
      process.exit = jasmine.createSpy('exit');
      spyOn(helper, 'log');

      helper.fatal();
      expect(helper.log).not.toHaveBeenCalled();
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  it('could log()', () => {
    helper.log('message');
    expect(console.log).toHaveBeenCalledWith('message');
  });
});
