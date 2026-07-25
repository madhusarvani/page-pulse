/**
 * Calculate accessibility checklist based on audit data
 * @param {Object} data - Audit data from API
 * @returns {Array} - Array of accessibility checks
 */
export function calculateAccessibility(data) {
  const checks = [
    {
      id: 'title',
      label: 'Page Title Present',
      status: data.pageTitle && data.pageTitle !== 'No title found' ? 'pass' : 'fail',
      icon: 'title'
    },
    {
      id: 'metaDescription',
      label: 'Meta Description Present',
      status: data.metaDescription && data.metaDescription !== 'No meta description found' ? 'pass' : 'fail',
      icon: 'description'
    },
    {
      id: 'h1',
      label: 'At Least One H1 Tag',
      status: data.h1Count > 0 ? 'pass' : 'fail',
      icon: 'heading'
    },
    {
      id: 'images',
      label: 'Images Have ALT Attributes',
      status: data.imagesMissingAlt === 0 ? 'pass' : 'warning',
      icon: 'image'
    },
    {
      id: 'http',
      label: 'HTTP Success Status',
      status: data.httpStatus >= 200 && data.httpStatus < 400 ? 'pass' : 'fail',
      icon: 'http'
    },
    {
      id: 'https',
      label: 'HTTPS Enabled',
      status: data.url.startsWith('https://') ? 'pass' : 'fail',
      icon: 'lock'
    }
  ];

  return checks;
}

/**
 * Get accessibility score percentage
 * @param {Array} checks - Accessibility checks
 * @returns {number} - Percentage of passed checks
 */
export function getAccessibilityScore(checks) {
  const passed = checks.filter(check => check.status === 'pass').length;
  return Math.round((passed / checks.length) * 100);
}
