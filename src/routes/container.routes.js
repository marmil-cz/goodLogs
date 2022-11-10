const express = require('express');
const router = express.Router();
const containerController = require('../controllers/container.controller.js');

/**
 * serves styled log
 */
router.get('/:containerName', containerController.getLogPage);

/**
 * provides SSE stream
 */
router.get('/:containerName/event-stream', containerController.getStream);

module.exports = router;