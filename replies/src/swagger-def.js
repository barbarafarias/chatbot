const { version } = require('../package.json');
const config = require('../config');

// Swagger definition
module.exports = {
  info: {
    title: 'Chatbot Replies API',
    version,
    description: 'Chatbot Replies API',
  },
  host: `${config.host}:${config.port}`,
};
