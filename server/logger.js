import winston from 'winston';

const format = winston.format.printf(({ message, timestamp }) => `${timestamp}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    format
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
