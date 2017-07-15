'use strict';

const proxyquire = require('proxyquire');

module.exports = {
  app: require('../../app/ejs-renderer'),
  mocked: {
    helper: (util) => {
      return proxyquire('../../app/helper', {
        'util': util,
      });
    },
    index: (app) => {
      proxyquire('../../app', {
        './ejs-renderer': app,
      });
    },
  },
};
