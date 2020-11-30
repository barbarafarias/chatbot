const startServer = require('../../../start');

module.exports = async () => {
  global.server = await startServer();
};
