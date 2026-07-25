/**
 * Audit Routes
 * Defines API endpoints for website auditing
 */

const express = require('express');
const router = express.Router();
const { auditController } = require('../controllers/auditController');

/**
 * POST /api/audit
 * Audits a website URL and returns SEO metrics
 */
router.post('/audit', auditController);

module.exports = router;
