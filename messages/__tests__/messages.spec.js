const axios = require('axios');
const config = require('../config');

jest.mock('../src/handlers/messages/helpers/intentsAPI');
const { post } = require('../src/handlers/messages/helpers/intentsAPI');

// mocking intents API response
post.mockImplementation(() => console.log('some api call'));

const baseURL = `http://localhost:${config.port}`;

test('validate empty body', async () => {
  try {
    await axios.post(`${baseURL}/${config.api.base}/${config.api.version}/messages`, {});
  } catch (err) {
    expect(err.response.data.status).toEqual(422);
  }
});

test('validate correct body', async () => {
  const expectData = {
    intents: [
      {
        confidence: 0.9999997615814209,
        name: 'Greeting',
      },
      {
        confidence: 1.62668726488846e-7,
        name: 'Means or need to contact ',
      },
      {
        confidence: 3.397815007133431e-8,
        name: 'Goodbye',
      },
      {
        confidence: 3.0179286847342723e-10,
        name: 'Affirmative',
      },
      {
        confidence: 9.302451170478676e-11,
        name: 'What can I ask you?',
      },
    ],
  };

  const response = await axios.post(`${baseURL}/${config.api.base}/${config.api.version}/messages`, {
    botId: '5f74865056d7bb000fcd39ff',
    message: 'hello',
    conversationId: '1234567890',
  });

  expect(response.status).toEqual(200);
  expect(response.data.intents).toEqual(expectData.intents);

  // mock.restore();
});
