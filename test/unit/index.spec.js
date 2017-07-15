'use strict';

const app = {
  start: jasmine.createSpy(),
};

require('./path').mocked.index(app);

describe('app entry', () => {
  it('should start the application', () => {
    expect(app.start).toHaveBeenCalledWith();
  });
});
