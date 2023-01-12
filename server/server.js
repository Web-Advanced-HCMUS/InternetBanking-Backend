import Express from 'express';
import http, { createServer } from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import BasicAuth from 'express-basic-auth';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import ResponseHandler from './utils/respone.js';
import errorHandle from './utils/errorHandle.js';
import apis from './endpoint.js';
import { swaggerSpec, swaggerPublic } from './docs.js';
import logger from './logger.js';

const {
 PORT, USER_API_DOCS, PASS_API_DOCS, MONGO_URI, USER_PULBIC_API_DOCS, PASS_PULBIC_API_DOCS
} = process.env;

const app = new Express();
app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    const responeMess = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');

    if (res.statusCode < 400) logger.info(responeMess);
    else logger.error(res.statusMessage);

    return responeMess;
  })
);
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use((req, res, next) => {
  res.RH = new ResponseHandler(res);
  next();
});

app.use(
  '/api-docs',
  BasicAuth({ users: { [USER_API_DOCS]: PASS_API_DOCS }, challenge: true }),
  swaggerUI.serveFiles(swaggerSpec, {}),
  swaggerUI.setup(swaggerSpec)
);

app.use(
  '/api-docs-for-linked-bank',
  BasicAuth({ users: { [USER_PULBIC_API_DOCS]: PASS_PULBIC_API_DOCS }, challenge: true }),
  swaggerUI.serveFiles(swaggerPublic, {}),
  swaggerUI.setup(swaggerPublic)
);

app.use('/', apis);

app.use(errorHandle);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (data) => {
    logger.info('Mongodb connected');
  })
  .catch((error) => {
    console.log(error);
    logger.error('Please make sure Mongodb is installed and running!');
    process.exit(1);
  });

const httpServer = http.createServer(app, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });
  res.end('Hi there!');
});

const io = new Server(httpServer, { cors: { origin: '*' } });
let userOnline = [];
const addNewUser = (accountNumber, userId, socketId) => {
    !userOnline.some((user) => user.accountNumber === accountNumber)
        && userOnline.push({ accountNumber, userId, socketId });
};
const removeUser = (socketId) => {
    userOnline = userOnline.filter((user) => user.socketId !== socketId);
};
io.listen(httpServer);
app.set('socket_io', io);
app.set('user_online', userOnline);
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        removeUser(socket.id);
        app.set('user_online', userOnline);
    });

    socket.on('online', (user) => {
        addNewUser(user.accountNumber, user.userId, socket.id);
        app.set('user_online', userOnline);
    });
});

httpServer.listen(PORT, async (error) => {
  if (error) {
    logger.error('Cannot start backend services.');
    logger.error(error);
  } else {
    logger.info(`Backend service is running on port: ${PORT}.`);
  }
});
