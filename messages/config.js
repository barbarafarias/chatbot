const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  api: {
    base: 'api',
    version: 'v0',
  },
  intentsAPI: {
    base: 'https://chat.ultimate.ai/api',
    apiKey: process.env.INTENT_API_KEY,
  },
  repliesAPI: {
    host: isDev ? 'http://replies' : process.env.REPLIES_HOST || 'http://localhost',
    port: process.env.REPLIES_PORT || '3001',
    base: process.env.REPLIES_BASE || 'api',
    version: process.env.REPLIES_VERSION || 'v0',
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
};
