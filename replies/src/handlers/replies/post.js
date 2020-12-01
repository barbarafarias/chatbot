const Ajv = require('ajv');

const logger = require('loglevel');

const ajv = new Ajv({ useDefaults: true });
const validate = ajv.compile(require('./helpers/create.schema.json'));

const { Message } = require('../../models/message');

/**
 * @swagger
 * /api/v0/replies:
 *   post:
 *     tags:
 *       - replies
 *     summary: Create a virtual assistant reply
 *     description: Create a virtual assistant reply
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: message
 *       description: The message to be returned
 *       required: true
 *     - in: body
 *       name: intent
 *       description: The ultimate ai intent
 *       required: true
 *     responses:
 *       200:
 *         description: Reply Message successfully created.
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
    let reply = new Message({ ...body });
    reply = await reply.save();

    return res.status(200).json({
      status: 200,
      message: 'Reply Message successfully created.',
      reply,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: 500,
      message: 'An internal error occurred.',
    });
  }
};
