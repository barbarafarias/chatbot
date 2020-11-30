/* eslint-disable global-require */
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger-def');

// Options for the swagger docs
const swaggerOptions = {
  swaggerDefinition,
  apis: [
    path.resolve(__dirname, './handlers/**/*.js'),
    path.resolve(__dirname, './**/*.yml'),
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

exports.register = (server) => {
  // docs
  server.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // health check
  server.get('/health', require('./handlers/health'));
};
