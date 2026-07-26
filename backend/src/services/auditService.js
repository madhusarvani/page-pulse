/**
 * Audit Service
 * Core service for fetching and analyzing web pages
 * 
 * @module auditService
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { isValidUrl, normalizeUrl } = require('../utils/urlValidator');

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

/**
 * Performs a complete audit of a website URL
 * Fetches the webpage, validates it's HTML, and extracts SEO metrics
 * 
 * @async
 * @function auditUrl
 * @param {string} url - The URL to audit
 * @returns {Promise<Object>} Audit results containing:
 *   - url {string} - The audited URL
 *   - httpStatus {number} - HTTP status code
 *   - responseTime {string} - Response time in milliseconds
 *   - pageTitle {string} - Page title or 'No title found'
 *   - metaDescription {string} - Meta description or 'No meta description found'
 *   - h1Count {number} - Number of H1 tags
 *   - imagesMissingAlt {number} - Number of images without alt text
 *   - wordCount {number} - Approximate word count
 *   - timestamp {string} - ISO timestamp of audit
 * @throws {Error} With statusCode property for different error types:
 *   - 400: Invalid URL format
 *   - 415: URL does not return HTML
 *   - 504: Request timed out
 *   - 502: Unable to reach website (DNS/connection error)
 *   - 500: Internal server error
 */
async function auditUrl(url) {
  // Normalize URL first (add https:// if missing)
  const normalizedUrl = normalizeUrl(url);
  
  // Validate URL after normalization
  if (!isValidUrl(normalizedUrl)) {
    const error = new Error('Invalid URL');
    error.statusCode = 400;
    throw error;
  }

  const startTime = Date.now();

  try {
    // Fetch the webpage
    const response = await axios.get(normalizedUrl, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      maxRedirects: 5
    });

    const responseTime = Date.now() - startTime;

    // Check if content is HTML
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('text/html')) {
      const error = new Error('URL does not return HTML');
      error.statusCode = 415;
      throw error;
    }

    // Parse HTML and extract metrics
    const metrics = parseHtml(response.data, normalizedUrl, response.status, responseTime);

    return metrics;

  } catch (error) {
    // Handle axios response errors (e.g., 403, 404, 500 from target server)
    if (error.response) {
      const responseTime = Date.now() - startTime;
      const contentType = error.response.headers['content-type'] || '';
      
      // If it's HTML content, still try to parse it
      if (contentType.includes('text/html') && error.response.data) {
        try {
          const metrics = parseHtml(error.response.data, normalizedUrl, error.response.status, responseTime);
          return metrics;
        } catch (parseError) {
          // If parsing fails, return the HTTP status error
          const httpError = new Error(`Website returned HTTP ${error.response.status}`);
          httpError.statusCode = error.response.status;
          throw httpError;
        }
      }
      
      // For non-HTML responses or no data, return the HTTP status error
      const httpError = new Error(`Website returned HTTP ${error.response.status}`);
      httpError.statusCode = error.response.status;
      throw httpError;
    }

    // Re-throw custom errors with status codes first (including our 415 error)
    if (error.statusCode) {
      throw error;
    }

    if (error.code === 'ECONNABORTED') {
      const timeoutError = new Error('Request timed out');
      timeoutError.statusCode = 504;
      throw timeoutError;
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      const dnsError = new Error('Unable to reach website');
      dnsError.statusCode = 502;
      throw dnsError;
    }

    // Handle unexpected errors
    const serverError = new Error('Internal server error');
    serverError.statusCode = 500;
    throw serverError;
  }
}

/**
 * Parses HTML content and extracts SEO metrics
 * Uses Cheerio to traverse DOM and extract relevant information
 * 
 * @function parseHtml
 * @param {string} html - The HTML content to parse
 * @param {string} url - The audited URL
 * @param {number} httpStatus - The HTTP status code
 * @param {number} responseTime - The response time in milliseconds
 * @returns {Object} Parsed metrics containing:
 *   - url {string}
 *   - httpStatus {number}
 *   - responseTime {string}
 *   - pageTitle {string}
 *   - metaDescription {string}
 *   - h1Count {number}
 *   - imagesMissingAlt {number}
 *   - wordCount {number}
 *   - timestamp {string}
 */
function parseHtml(html, url, httpStatus, responseTime) {
  const $ = cheerio.load(html);

  // Extract page title
  const pageTitle = $('title').text().trim() || 'No title found';

  // Extract meta description
  const metaDescription = $('meta[name="description"]').attr('content') || 
                          $('meta[property="og:description"]').attr('content') || 
                          'No meta description found';

  // Count H1 tags
  const h1Count = $('h1').length;

  // Count images without alt attribute
  const imagesMissingAlt = $('img').filter(function() {
    return !$(this).attr('alt');
  }).length;

  // Calculate approximate word count
  const bodyText = $('body').text();
  const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;

  return {
    url,
    httpStatus,
    responseTime: `${responseTime} ms`,
    pageTitle,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  auditUrl
};
