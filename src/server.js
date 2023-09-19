const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
require('dotenv').config();

const host = 'localhost';
const port = process.env.SERVER_PORT || 8000;
const log = process.env.LOGGER_TYPE || 'text';

const app = express();
var myLogger = function (req, res, next) {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (log === 'json') {
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.prettyPrint()
    })
  );
}
if (log === 'text') {
  app.use(myLogger);
}

app.get('/', (req, res) => {
  const message = req.query.message;

  if (message === undefined) {
    res.status(422).json({ error: `'${message}' was not provided` });
    return;
  }

  res.json({ message });
});

app.post('/', (req, res) => {
  const message = req.body.message;

  if (message === undefined) {
    res.status(422).json({ error: `'${message}' was not provided` });
    return;
  }

  if (typeof message !== 'string') {
    res.status(422).json({ error: `'${message}' was not a string` });
    return;
  }

  res.json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
