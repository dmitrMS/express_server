const winston = require('winston');
const expressWinston = require('express-winston');
require('dotenv').config();

const log = process.env.LOGGER_TYPE || 'text';

if (log === 'json') {
  const myLogger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.prettyPrint()
  });

  module.exports = myLogger;
}

if (log === 'text') {
  const myLogger = function (req, res, next) {
    const startTime = Date.now();
    res.on('finish', function () {
      console.log(
        req.method,
        decodeURI(req.url),
        res.statusCode,
        Date.now() - startTime
      );
    });

    next();
  };

  module.exports = myLogger;
}
