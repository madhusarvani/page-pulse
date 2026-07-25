import { calculateHealthScore } from './healthScore';

/**
 * Generate shareable URL for audit report
 * @param {string} url - The audited URL
 * @returns {string} - Shareable URL
 */
export function generateShareUrl(url) {
  const baseUrl = window.location.origin;
  return `${baseUrl}?page=${encodeURIComponent(url)}`;
}

/**
 * Copy share URL to clipboard
 * @param {string} url - The audited URL
 * @returns {Promise<boolean>} - Success status
 */
export async function copyShareUrl(url) {
  try {
    const shareUrl = generateShareUrl(url);
    await navigator.clipboard.writeText(shareUrl);
    return true;
  } catch (error) {
    console.error('Failed to copy share URL:', error);
    return false;
  }
}

/**
 * Share using native Web Share API if available
 * @param {string} url - The audited URL
 * @param {Object} data - Audit data
 * @returns {Promise<boolean>} - Success status
 */
export async function nativeShare(url, data) {
  if (!navigator.share) {
    return false;
  }

  try {
    const shareUrl = generateShareUrl(url);
    await navigator.share({
      title: 'Page Pulse Audit Report',
      text: `Website audit for ${url} - Health Score: ${calculateHealthScore(data)}/100`,
      url: shareUrl
    });
    return true;
  } catch (error) {
    console.error('Share failed:', error);
    return false;
  }
}

/**
 * Get URL from query parameters
 * @returns {string|null} - URL from query params
 */
export function getUrlFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('page');
}
