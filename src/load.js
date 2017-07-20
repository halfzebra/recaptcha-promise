'use strict';

var RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js';

function stringifyPrimitive(v) {
  if (typeof v === 'string') return v;
  if (typeof v === 'number' && isFinite(v)) return '' + v;
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return '';
}

function stringify(obj) {
  var sep = '&';
  var eq = '=';

  if (obj !== null && typeof obj === 'object') {
    var keys = Object.keys(obj);
    var len = keys.length;
    var flast = len - 1;
    var fields = '';
    for (var i = 0; i < len; ++i) {
      var k = keys[i];
      var v = obj[k];
      var ks = window.encodeURIComponent(stringifyPrimitive(k)) + eq;

      fields += ks + window.encodeURIComponent(stringifyPrimitive(v));
      if (i < flast) fields += sep;
    }
    return fields;
  }
  return '';
}

function load(parameters) {
  var ONLOAD_CALLBACK_NAME = '__recaptchaOnload';
  var defaultParamenters = {
    onload: ONLOAD_CALLBACK_NAME,
    render: 'explicit'
  };
  var callback;

  if (parameters) {
    if (parameters.onload) {
      console.warn(
        'recaptcha-promise does not support setting an onload callback, please use the Promise API'
      );
    }

    parameters = Object.assign({}, defaultParamenters, parameters);
  } else {
    parameters = defaultParamenters;
  }

  var src = RECAPTCHA_URL + '?' + stringify(parameters);

  return new Promise(function(resolve, reject) {
    setOnloadCallback(ONLOAD_CALLBACK_NAME, function() {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
      } else {
        reject(new Error('grecaptcha is not found in window'));
      }
      delete window[ONLOAD_CALLBACK_NAME];
    });

    var script = createScript(src);

    script.addEventListener('error', function(error) {
      reject(error);
    });

    document.head.appendChild(script);
  });
}

function setOnloadCallback(name, callback) {
  window[name] = callback;
}

function createScript(src) {
  var script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.type = 'text/javascript';

  return script;
}

module.exports = load;
