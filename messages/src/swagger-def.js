const { version } = require('../package.json');
const config = require('../config');

// Swagger definition
module.exports = {
  info: {
    title: 'Chatbot Messages API',
    version,
    description: 'Chatbot Messages API',
  },
  host: `${config.host}:${config.port}`,
};
