/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

/**
 * Global error handler middleware
 * @param {object} err - Error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function errorHandler(err, req, res, next) {
  // Log error for debugging (in production, use proper logging service)
  console.error('Error:', err.message);

  // Determine status code from error or default to 500
  const statusCode = err.statusCode || 500;

  // Return error response
  res.status(statusCode).json({
    error: err.message || 'Internal server error'
  });
}

module.exports = {
  errorHandler
};
