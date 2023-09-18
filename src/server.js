const express = require('express');
const bodyParser = require('body-parser');
const pino = require('pino');
const logger = pino({});
const pinoHTTP = require('express-pino-logger');

require('dotenv').config();

const host = 'localhost';
const port = process.env.SERVER_PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  pinoHTTP({
    logger
  })
);

app.get('/', (req, res) => {
  const message = req.query.message;

  if (message === undefined) {
    res.status(422).json({ error: `'${message}' was not provided` });
    return;
  }
  // logger(req, res);
  logger.info(`${message}`);

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
  logger(req, res);
  req.log.info(`${message}`);

  res.json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
