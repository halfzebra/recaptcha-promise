'use strict';

var load = require('./load');
var promisify = require('./promisify');

var promisifiedMemoized = null;

module.exports = {
  load: function(parameters) {
    if (promisifiedMemoized) {
      return Promise.resolve(promisifiedMemoized);
    }
    return load(parameters).then(promisify).then(function(promisified) {
      promisifiedMemoized = promisified;
    });
  },
  promisify: promisify
};
