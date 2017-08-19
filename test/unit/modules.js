'use strict';

const proxyquire = require('proxyquire');

const console = {
  log: jasmine.createSpy('log'),
};

module.exports = {
  app: require('../../app/ejs-renderer'),
  mocked: {
    console: () => {
      return proxyquire('../../app/global/console', {
        console,
      });
    },
    helper: () => {
      return proxyquire('../../app/helper', {
        '../global/console': console,
      });
    },
    index: (app) => {
      proxyquire('../../app', {
        './ejs-renderer': app,
      });
    },
  },
};
