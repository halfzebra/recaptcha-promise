'use strict';

var load = require('./load');
var promisify = require('./promisify');


module.exports = {
  load: function (parameters) {
    return load(parameters).then(promisify);
  },
  promisify: promisify
};