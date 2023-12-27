const express = require('express');
const usersAPIController = require('../../controllers/API/usersAPIController');
const router = express.Router();

router.get('/users', usersAPIController.users);
router.get('/users/:id', usersAPIController.user);

module.exports = router;