module.exports = {
  api: {
    default: {
      base: 'api',
      version: 'v0',
    },
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
};
