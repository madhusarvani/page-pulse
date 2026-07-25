/**
 * Calculate website health score based on audit data
 * @param {Object} data - Audit data from API
 * @returns {number} - Health score (0-100)
 */
export function calculateHealthScore(data) {
  let score = 100;

  // Subtract 10 if title is missing or empty
  if (!data.pageTitle || data.pageTitle === 'No title found') {
    score -= 10;
  }

  // Subtract 10 if meta description is missing or empty
  if (!data.metaDescription || data.metaDescription === 'No meta description found') {
    score -= 10;
  }

  // Subtract 5 if no H1 tags
  if (data.h1Count === 0) {
    score -= 5;
  }

  // Subtract 5 for each image without alt attribute
  score -= Math.min(data.imagesMissingAlt * 5, 25); // Cap at 25 points for images

  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Get health rating label based on score
 * @param {number} score - Health score
 * @returns {string} - Rating label
 */
export function getHealthRating(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Poor';
}

/**
 * Get health color based on score
 * @param {number} score - Health score
 * @returns {string} - Color class
 */
export function getHealthColor(score) {
  if (score >= 90) return 'text-green-400';
  if (score >= 70) return 'text-blue-400';
  if (score >= 50) return 'text-orange-400';
  return 'text-red-400';
}
