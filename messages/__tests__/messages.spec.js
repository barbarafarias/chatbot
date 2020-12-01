const axios = require('axios');
const config = require('../config');
const postMessage = require('../src/handlers/messages/post');

const baseURL = `http://localhost:${config.port}`;

jest.mock('axios');

const buildRes = (overrides) => {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    ...overrides,
  };
  return res;
};

test('validate correct body', async () => {
  const req = {
    body: {
      botId: '5f74865056d7bb000fcd39ff',
      message: 'hello',
      conversationId: '1234567890',
    },
  };

  const res = buildRes();
  const next = jest.fn();

  const ultimateAIResponse = {
    status: 200,
    data: {
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
      entities: [],
    },
  };
  axios.post.mockImplementationOnce(() => Promise.resolve(ultimateAIResponse));

  const repliesAPIResponse = {
    status: 200,
    message: 'Message successfully replied.',
    data: {
      replies: [{
        _id: '5fc62bbfc3e3cf1370694eac',
        intent: 'Greeting',
        message: 'Hello :) How can I help you?',
      }],
    },
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(repliesAPIResponse));

  await postMessage(req, res, next);

  expect(axios.post).toHaveBeenCalledWith(
    `${config.intentsAPI.base}/intents`,
    req.body,
    { headers: { authorization: '825765d4-7f8d-4d83-bb03-9d45ac9c27c0' } },
  );

  expect(axios.get).toHaveBeenCalledWith(
    `${config.repliesAPI.host}:${config.repliesAPI.port}/${config.repliesAPI.base}/${config.repliesAPI.version}/replies`,
    { params: { intent: 'Greeting' } },
  );

  expect(res.status).toHaveBeenCalledWith(200);
});

test('validate empty body', async () => {
  try {
    await axios.post(`${baseURL}/${config.api.base}/${config.api.version}/messages`, {});
  } catch (err) {
    expect(err.response.data.status).toEqual(422);
  }
});
