module.exports = function (config) {

  const testWebpackConfig = require('./webpack.config.test');

  const configuration = {

    /**
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: [ 'jasmine' ],

    reporters: [ 'mocha' ],

    /**
     * Webpack please don't spam the console when running in karma!
     */
    webpackMiddleware: {
      /**
       * webpack-dev-middleware configuration
       * i.e.
       */
      noInfo: true,
      /**
       * and use stats to turn off verbose output
       */
      stats: {
        /**
         * options i.e.
         */
        chunks: false
      }
    },

    /**
     * Level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    files: [
      { pattern: './config/spec-bundle.js', watched: false },
    ],

    preprocessors: { './config/spec-bundle.js': [ 'coverage', 'webpack', 'sourcemap' ] },

    browsers: [
      'Chrome'
    ],

    webpack: testWebpackConfig,

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: [ '--no-sandbox' ]
      }
    },

    /**
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true

  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};