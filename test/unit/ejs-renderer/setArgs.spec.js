'use strict';

const app = require('../modules').app;

describe('app module ->', () => {
  beforeEach(() => {
    spyOn(app, 'treatArgsInput');
  });

  it('could setArgs()', () => {
    const obj = {
      argsInput: 'argsInput',
      argsOutput: 'argsOutput',
      argsTemplateFolder: 'argsTemplateFolder',
    };

    expect(app.argsInput).not.toBe('argsInput');
    expect(app.argsDestFolder).not.toBe('argsOutput');
    expect(app.argsOutput).not.toBe('argsOutput');
    expect(app.argsTemplateFolder).not.toBe('argsTemplateFolder');

    app.setArgs(obj);

    expect(app.argsInput).toBe('argsInput');
    expect(app.argsDestFolder).toBe('argsOutput');
    expect(app.argsOutput).toBe('argsOutput');
    expect(app.argsTemplateFolder).toBe('argsTemplateFolder');
  });
});
