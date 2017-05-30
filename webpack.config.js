switch (process.env.NODE_ENV) {
  case 'build':
    module.exports = require('./config/webpack.config.build');
    break;
  case 'test':
    module.exports = require('./config/webpack.config.test');
    break;
}