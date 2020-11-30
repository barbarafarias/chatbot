module.exports = {
  api: {
    base: 'api',
    version: 'v0',
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  db: {
    connection: process.env.MONGODB_URI,
  },
};
