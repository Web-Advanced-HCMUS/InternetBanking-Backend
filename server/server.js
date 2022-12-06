import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import ResponseHandler from './utils/respone.js';
import errorHandle from './utils/errorHandle.js';
import apis from './endpoints.js';
import swaggerSpec from './docs.js';
import logger from './logger.js';

const { PORT } = process.env;

const app = new Express();

app.use(morgan((tokens, req, res) => {
  const responeMess = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');

  if (res.statusCode < 400) logger.info(responeMess);
  else logger.error(res.statusMessage);

  return responeMess;
}));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use((req, res, next) => {
  res.RH = new ResponseHandler(res);
  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/', apis);

app.use(errorHandle);

const httpServer = http.createServer(app, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  res.end('Hi there!');
});

httpServer.listen(PORT, async (error) => {
  if (error) {
    logger.error('Cannot start backend services.');
    logger.error(error);
  } else {
    logger.info(`Backend service is running on port: ${PORT}.`);
  }
});
