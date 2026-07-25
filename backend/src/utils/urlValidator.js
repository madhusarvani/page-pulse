/**
 * URL Validator Utility
 * Validates and normalizes URLs for the audit service
 */

/**
 * Validates if a string is a proper URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

/**
 * Normalizes URL by ensuring it has https:// prefix
 * @param {string} url - The URL to normalize
 * @returns {string} - Normalized URL with https:// prefix
 */
function normalizeUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

module.exports = {
  isValidUrl,
  normalizeUrl
};
