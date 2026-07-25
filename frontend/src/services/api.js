/**
 * API Service
 * Handles communication with the backend API
 */

import axios from 'axios';

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Audits a website URL
 * @param {string} url - The URL to audit
 * @returns {Promise} - Audit results
 */
export const auditUrl = async (url) => {
  try {
    const response = await api.post('/audit', { url });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data || { error: 'Failed to audit URL' };
  }
};

export default api;
