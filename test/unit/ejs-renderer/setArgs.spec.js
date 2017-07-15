'use strict';

const app = require('../path').app;

describe('app module ->', () => {
  it('could setArgs()', () => {
    const obj = {
      argsContentFile: 'argsContentFile',
      argsContentFolder: 'argsContentFolder',
      argsDestFolder: 'argsDestFolder',
      argsTemplateFolder: 'argsTemplateFolder',
    };

    expect(app.argsContentFile).not.toBe('argsContentFile');
    expect(app.argsContentFolder).not.toBe('argsContentFolder');
    expect(app.argsDestFolder).not.toBe('argsDestFolder');
    expect(app.argsTemplateFolder).not.toBe('argsTemplateFolder');

    app.setArgs(obj);

    expect(app.argsContentFile).toBe('argsContentFile');
    expect(app.argsContentFolder).toBe('argsContentFolder');
    expect(app.argsDestFolder).toBe('argsDestFolder');
    expect(app.argsTemplateFolder).toBe('argsTemplateFolder');
  });
});
