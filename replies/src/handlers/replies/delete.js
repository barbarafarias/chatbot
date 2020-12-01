const logger = require('loglevel');
const { Message } = require('../../models/message');

/**
 * @swagger
 * /api/v0/replies/{id}:
 *   delete:
 *     tags:
 *       - replies
 *     summary: Delete a virtual assistant reply
 *     description: Delete a virtual assistant reply
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 *       description: Alphanumeric ID of the reply
 *     responses:
 *       200:
 *         description: Reply successfully deleted.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */
module.exports = async (req, res, next) => {
  try {
    // delete from mongodb
    await Message.findById({ _id: req.params.id });

    return res.status(200).json({
      status: 200,
      message: 'Reply successfully delete.',
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: 500,
      message: 'An internal error occurred.',
    });
  }
};
