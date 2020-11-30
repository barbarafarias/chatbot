const { version } = require('../package.json');
const config = require('../config');

// Swagger definition
module.exports = {
  info: {
    title: 'Chat Bot',
    version,
    description: 'Chat Bot using ultimate.ai API',
  },
  host: `${config.host}:${config.port}`,
};
