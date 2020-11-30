const { Reply } = require('../../models/reply');

/**
 * @swagger
 * /api/v0/replies:
 *   get:
 *     tags:
 *       - replies
 *     summary: Returns a virtual assistant reply
 *     description: Returns a virtual assistant reply based on an intent
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: query
 *       name: intent
 *       description: The intent
 *       required: true
 *     responses:
 *       200:
 *         description: Get successfully reply message.
 *       400:
 *         description: Bad Request.
 *       422:
 *         description: Request body could not be accepted.
 *       500:
 *         description: Internal Server Error.
 */
module.exports = async (req, res, next) => {
  if (!req.query.intent) {
    return res.status(400).json({
      status: 400,
      msg: 'Request requires intent.',
    });
  }

  const { intent } = req.query;

  try {
    const replies = await Reply.find({ intent });

    return res.status(200).json({
      status: 200,
      message: 'Message successfully replied.',
      replies,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'An internal error occurred.',
    });
  }
};
