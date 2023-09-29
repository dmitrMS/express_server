import express from 'express';
import bodyParser from 'body-parser';
import { cfg } from './config.js';
import { logger, logMiddleware } from './logger.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logMiddleware);

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

app.listen(cfg.server.port, () => {
  logger.info(`Server is running `, {
    host: cfg.server.host,
    port: cfg.server.port
  });
});
