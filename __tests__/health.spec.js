const axios = require('axios');
const startServer = require('../start');

let server; let
  baseURL;

beforeAll(async () => {
  server = await startServer();
  baseURL = `http://localhost:${server.address().port}`;
});

afterAll(() => server.close());

test('health system returns 200', async () => {
  const response = await axios.get(`${baseURL}/health`);
  expect(response.data.status).toEqual(200)
  expect(response.data.msg).toEqual('ok')
});
