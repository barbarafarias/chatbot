const { Message } = require('../src/models/message');
const postReply = require('../src/handlers/replies/post');
const getReply = require('../src/handlers/replies/get');
const deleteReply = require('../src/handlers/replies/delete');

const buildRes = (overrides) => {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    ...overrides,
  };
  return res;
};

test('create a reply message', async () => {
  const req = {
    body: {
      intent: 'Bye',
      message: 'We are always here to help. See you.',
    },
  };

  const res = buildRes();
  const next = jest.fn();

  const expectedData = {
    _id: '5fc638e65646eacd3b4f262a',
    intent: req.body.intent,
    message: req.body.message,
  };
  jest.spyOn(Message.prototype, 'save').mockImplementationOnce(() => Promise.resolve(expectedData));

  await postReply(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Reply Message successfully created.', reply: expectedData, status: 200 });
});

test('return a reply message', async () => {
  const req = {
    query: {
      intent: 'Greeting',
    },
  };

  const res = buildRes();
  const next = jest.fn();

  const expectedData = [{
    _id: '5fc638e65646eacd3b4f262a',
    intent: 'Greeting',
    message: 'Hello :) How can I help you?',
  }];
  Message.find = jest.fn().mockResolvedValue(expectedData);

  await getReply(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Message successfully replied.', replies: expectedData, status: 200 });
});

test('create a reply message', async () => {
  const req = {
    body: {
      intent: 'Bye',
      message: 'We are always here to help. See you.',
    },
  };

  const res = buildRes();
  const next = jest.fn();

  const expectedData = {
    _id: '5fc638e65646eacd3b4f262a',
    intent: req.body.intent,
    message: req.body.message,
  };
  jest.spyOn(Message.prototype, 'save').mockImplementationOnce(() => Promise.resolve(expectedData));

  await postReply(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Reply Message successfully created.', reply: expectedData, status: 200 });
});

test('return a reply message', async () => {
  const req = {
    params: {
      id: '5fc638e65646eacd3b4f262a',
    },
  };

  const res = buildRes();
  const next = jest.fn();

  const expectedData = [{
    _id: '5fc638e65646eacd3b4f262a',
    intent: 'Greeting',
    message: 'Hello :) How can I help you?',
  }];
  Message.findByIdAndDelete = jest.fn().mockResolvedValue(expectedData);

  await deleteReply(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Reply successfully delete.', status: 200 });
});
