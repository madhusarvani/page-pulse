/**
 * Tests for auditService
 * Tests the core parsing logic and error handling
 */

const { auditService } = require('../src/services/auditService');
const axios = require('axios');

// Mock axios to avoid actual network requests
jest.mock('axios');

describe('auditService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path - Successful HTML Response', () => {
    it('should parse HTML and return correct metrics', async () => {
      const mockHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="This is a test description">
        </head>
        <body>
          <h1>Main Heading</h1>
          <h1>Another Heading</h1>
          <p>This is some text with multiple words for counting.</p>
          <img src="image1.jpg" alt="Image 1">
          <img src="image2.jpg">
          <img src="image3.jpg" alt="Image 3">
        </body>
        </html>
      `;

      axios.get.mockResolvedValue({
        status: 200,
        data: mockHtml
      });

      const result = await auditService('https://example.com');

      expect(result).toHaveProperty('url', 'https://example.com');
      expect(result).toHaveProperty('httpStatus', 200);
      expect(result).toHaveProperty('pageTitle', 'Test Page');
      expect(result).toHaveProperty('metaDescription', 'This is a test description');
      expect(result).toHaveProperty('h1Count', 2);
      expect(result).toHaveProperty('imagesMissingAlt', 1);
      expect(result).toHaveProperty('wordCount');
      expect(result.wordCount).toBeGreaterThan(0);
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('Invalid URL', () => {
    it('should return 400 error for invalid URL format', async () => {
      const invalidUrl = 'not-a-valid-url';
      
      try {
        await auditService(invalidUrl);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 400);
        expect(error).toHaveProperty('error', 'Invalid URL');
      }
    });

    it('should reject URLs without protocol', async () => {
      const urlWithoutProtocol = 'example.com';
      
      try {
        await auditService(urlWithoutProtocol);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 400);
        expect(error).toHaveProperty('error', 'Invalid URL');
      }
    });
  });

  describe('Timeout', () => {
    it('should return 504 error on request timeout', async () => {
      axios.get.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout of 10000ms exceeded'
      });

      try {
        await auditService('https://example.com');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 504);
        expect(error).toHaveProperty('error', 'Request timed out');
      }
    });
  });

  describe('Non-HTML Response', () => {
    it('should return 415 error for image response', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        headers: {
          'content-type': 'image/jpeg'
        },
        data: Buffer.from('fake image data')
      });

      try {
        await auditService('https://example.com/image.jpg');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 415);
        expect(error).toHaveProperty('error', 'URL does not return HTML');
      }
    });

    it('should return 415 error for PDF response', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        headers: {
          'content-type': 'application/pdf'
        },
        data: '%PDF-1.4'
      });

      try {
        await auditService('https://example.com/document.pdf');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 415);
        expect(error).toHaveProperty('error', 'URL does not return HTML');
      }
    });
  });

  describe('DNS Failure', () => {
    it('should return 502 error on network error', async () => {
      axios.get.mockRejectedValue({
        code: 'ENOTFOUND',
        message: 'getaddrinfo ENOTFOUND example.invalid'
      });

      try {
        await auditService('https://example.invalid');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 502);
        expect(error).toHaveProperty('error', 'Unable to reach website');
      }
    });

    it('should return 502 error on connection refused', async () => {
      axios.get.mockRejectedValue({
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED'
      });

      try {
        await auditService('https://example.com');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 502);
        expect(error).toHaveProperty('error', 'Unable to reach website');
      }
    });
  });

  describe('Unexpected Exception', () => {
    it('should return 500 error on internal error', async () => {
      axios.get.mockRejectedValue(new Error('Unexpected error'));

      try {
        await auditService('https://example.com');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
        expect(error).toHaveProperty('error', 'Internal server error');
      }
    });

    it('should handle parsing errors gracefully', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: null
      });

      try {
        await auditService('https://example.com');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
        expect(error).toHaveProperty('error', 'Internal server error');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty HTML gracefully', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: ''
      });

      const result = await auditService('https://example.com');
      expect(result).toHaveProperty('h1Count', 0);
      expect(result).toHaveProperty('imagesMissingAlt', 0);
      expect(result).toHaveProperty('wordCount', 0);
    });

    it('should handle HTML without meta description', async () => {
      const htmlWithoutMeta = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <h1>Heading</h1>
        </body>
        </html>
      `;

      axios.get.mockResolvedValue({
        status: 200,
        data: htmlWithoutMeta
      });

      const result = await auditService('https://example.com');
      expect(result).toHaveProperty('metaDescription', 'No meta description found');
    });

    it('should handle HTML without title', async () => {
      const htmlWithoutTitle = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="description" content="Test description">
        </head>
        <body>
          <h1>Heading</h1>
        </body>
        </html>
      `;

      axios.get.mockResolvedValue({
        status: 200,
        data: htmlWithoutTitle
      });

      const result = await auditService('https://example.com');
      expect(result).toHaveProperty('pageTitle', 'No title found');
    });
  });
});
