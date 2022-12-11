import swaggerJSDoc from 'swagger-jsdoc';

const { PORT } = process.env;

const swaggerDefinition = {
  info: {
    title: 'INTERNET BANKNG',
    version: '1.0.0',
    description: 'INTERNET BANKNG FINAL PROJECT DOCS',
  },
  host: `localhost:${PORT}`,
  basePath: '/',
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

const options = {
  swaggerDefinition,
  apis: [
    'server/components/**/*.route.js',
    'server/components/**/*.docs.js',
    'server/utils/validatorErrorHandler.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
