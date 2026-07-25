/**
 * Audit Controller
 * Handles HTTP requests for website audits
 */

const { auditUrl } = require('../services/auditService');

/**
 * Controller for handling audit requests
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
async function auditController(req, res, next) {
  try {
    const { url } = req.body;

    // Validate that URL is provided
    if (!url) {
      return res.status(400).json({
        error: 'URL is required'
      });
    }

    // Perform the audit
    const result = await auditUrl(url);

    // Return successful response
    return res.status(200).json(result);

  } catch (error) {
    // Pass error to error handling middleware
    return next(error);
  }
}

module.exports = {
  auditController
};
