module.exports = {
  api: {
    base: 'api',
    version: 'v0',
  },
  env: process.env.NODE_ENV,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  db: {
    mongo: {
      connection: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
};
