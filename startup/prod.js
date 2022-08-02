const helmet = require('helmet');
const compression = require('compresion');

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
}