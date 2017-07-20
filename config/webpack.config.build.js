const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'recaptcha-promise.min.js',

    path: path.resolve('./'),

    libraryTarget: 'umd',

    library: 'recaptchaPromise'
  }

  // plugins: [new UglifyJsPlugin()]
};
