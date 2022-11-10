const express = require('express');
const router = express.Router();
const containerListController = require('../controllers/containerList.controller.js');

/**
 * serves styled log
 */
router.get('/', containerListController.getContainerListPage);

module.exports = router;