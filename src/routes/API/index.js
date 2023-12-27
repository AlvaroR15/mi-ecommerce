const express = require('express');
const generalApiController = require('../../controllers/API/generalAPIController');
const router = express.Router();

router.get('/general', generalApiController.index);

module.exports = router;