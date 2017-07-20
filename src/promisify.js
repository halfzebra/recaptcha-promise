'use strict';

module.exports = function promisify(grecaptcha) {
  var hashmap = {};

  function render(container, parameters, inherit) {
    var callback = function(token) {
      if (hashmap[id]) {
        hashmap[id](token);
        hashmap[id] = null;
      }
      if (parameters.callback) {
        parameters.callback(token);
      }
    };

    parameters = Object.assign({}, parameters, { callback: callback });

    var id = grecaptcha.render(container, parameters, inherit);

    hashmap[id] = null;

    container.addEventListener(
      'click',
      function(event) {
        return false;
      },
      true
    );

    return id;
  }

  function execute(id) {
    if (hashmap[id]) {
      return Promise.reject(new Error('The request is already pending'));
    }

    var promise = new Promise(function(resolve, reject) {
      hashmap[id] = resolve;
    });

    grecaptcha.execute(id);

    return promise;
  }

  function reset(id) {
    grecaptcha.reset(id);
  }

  return {
    render: render,
    execute: execute,
    reset: reset
  };
};
