import swaggerJSDoc from 'swagger-jsdoc';

const { PORT } = process.env;

const swaggerDefinition = {
  info: {
    title: 'SAKILA',
    version: '1.0.0',
    description: 'SAKILA HOMEWORK DOCS',
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
    'src/components/**/*.route.js',
    'src/components/**/*.docs.js',
    'src/utils/validatorErrorHandler.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
