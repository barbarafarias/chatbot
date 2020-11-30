const axios = require('axios');
const config = require('../config');

const baseURL = `http://localhost:${config.port}`;

test('health system returns 200', async () => {
  const response = await axios.get(`${baseURL}/health`);
  expect(response.data.status).toEqual(200);
  expect(response.data.msg).toEqual('ok');
});
