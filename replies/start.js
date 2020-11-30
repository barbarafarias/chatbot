/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const config = require('./config');

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

  console.log(`connecting mongodb on: ${config.db.connection}`);
  mongoose.connect(config.db.connection, { useNewUrlParser: true }).then(
    () => console.log('Mongodb connected.'),
  ).catch(
    (err) => {
      console.log(`Error while connecting mongodb: ${err}`);
    },
  );

  // start server
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Server is up and listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);
      server.close = () => new Promise((resolveClose) => {
        console.log('Server is being closed');
        originalClose(resolveClose);
      });

      resolve(server);
    });
  });
}

module.exports = startServer;
