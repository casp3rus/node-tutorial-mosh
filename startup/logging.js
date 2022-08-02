const winston = require('winston');
// require('winston-mongodb')
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ 
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      filename: 'uncaughtExceptions.log',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
    level: 'error',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }));

  // winston.add(new winston.transports.MongoDB({
  //   db: 'mongodb://localhost/vidly',
  //   level: 'silly',
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }));
}