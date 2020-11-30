/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - core
 *     summary: Get System Health
 *     description: Returns a health message
 *     responses:
 *       200:
 *         description: health
 */
module.exports = (req, res) => res.status(200).json({
  status: 200,
  msg: 'ok',
});
