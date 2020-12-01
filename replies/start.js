/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('loglevel');
const routes = require('./src/routes');
const config = require('./config');
const mongoose = require('./mongoose');

function startServer({ port = config.port } = {}) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json()); // To support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // To support URL-encoded bodies
      extended: true,
    }),
  );

  // setup routes
  routes.register(app);

  // trying to connect to mongodb
  mongoose.connect();

  // start server
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Server is up and listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);
      server.close = () => new Promise((resolveClose) => {
        logger.info('Server is being closed');
        originalClose(resolveClose);
      });

      resolve(server);
    });
  });
}

module.exports = startServer;
