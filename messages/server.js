const logger = require('loglevel');
const startServer = require('./start');

const isTest = process.env.NODE_ENV !== 'test';
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info');

logger.setLevel(logLevel);

startServer();
