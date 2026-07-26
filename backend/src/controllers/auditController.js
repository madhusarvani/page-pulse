/**
 * Audit Controller
 * Handles HTTP requests for website audits
 * 
 * @module auditController
 */

const { auditUrl } = require('../services/auditService');

/**
 * Controller for handling audit requests
 * Validates request body and delegates to audit service
 * 
 * @async
 * @function auditController
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.url - The URL to audit
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Sends JSON response with audit results or error
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
