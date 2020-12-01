const Ajv = require('ajv');
const axios = require('axios');

const ajv = new Ajv({ useDefaults: true });
const logger = require('loglevel');
const validate = ajv.compile(require('./helpers/schema.json'));
const config = require('../../../config');

/**
 * @swagger
 * /api/v0/messages:
 *   post:
 *     tags:
 *       - messages
 *     summary: Returns a virtual assistant reply
 *     description: Returns a virtual assistant reply based on a visitor message
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: message
 *       description: The visitor message
 *       required: true
 *     - in: body
 *       name: botId
 *       description: MongoObjectId for the bot
 *       required: true
 *     - in: body
 *       name: conversationId
 *       description: Can be any unique string that is used for all messages of a conversation
 *       required: true
 *     responses:
 *       200:
 *         description: Message successfully replied.
 *       400:
 *         description: Bad Request.
 *       422:
 *         description: Request body could not be accepted.
 *       500:
 *         description: Internal Server Error.
 */
module.exports = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      status: 400,
      msg: 'Request requires body.',
    });
  }

  const body = {
    ...req.body,
  };

  const valid = validate(body);
  if (!valid) {
    return res.status(422).json({
      status: 422,
      msg: 'Request body could not be accepted. Errors follow',
      result: validate.errors,
    });
  }

  try {
    // get intents from ultimate.ai
    const options = {
      headers: {
        authorization: config.intentsAPI.apiKey,
      },
    };
    const response = await axios.post(`${config.intentsAPI.base}/intents`, {
      ...body,
    }, options);

    if (response.status !== 200) {
      return res.status(response.status).json({
        status: response.status,
      });
    }

    if (response.data.intents.length < 1) {
      // no intent found, return default message
      return res.status(200).json({
        status: 200,
        message: 'Reply messages successfully.',
        results: [
          { reply: 'The AI could not give the correct answer.' },
        ],
      });
    }

    const intent = response.data.intents[0].name;
    const repliesResponse = await axios.get(`${config.repliesAPI.host}:${config.repliesAPI.port}/${config.repliesAPI.base}/${config.repliesAPI.version}/replies`, {
      params: {
        intent,
      },
    });

    if (repliesResponse.status !== 200) {
      return res.status(repliesResponse.status).json({
        status: repliesResponse.status,
        message: repliesResponse.message,
      });
    }

    return res.status(200).json({
      status: 200,
      message: repliesResponse.data.message,
      replies: repliesResponse.data.replies,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: 500,
      message: 'An internal error occurred.',
    });
  }
};
