const mongoose = require('mongoose');
const logger = require('loglevel');
const config = require('./config');

// Retry connection
const connectWithRetry = () => {
  logger.info('MongoDB connection with retry');
  mongoose.connect(config.db.mongo.connection, config.db.mongo.options)
    .then(() => {
      logger.info('MongoDB is connected');
    }).catch((err) => {
      logger.error(`MongoDB connection error: ${err}`);
      setTimeout(connectWithRetry, 5000);
    });
};

if (config.env !== 'production') {
  mongoose.set('debug', true);
}

const connect = () => {
  connectWithRetry();
};

module.exports = { connect };
