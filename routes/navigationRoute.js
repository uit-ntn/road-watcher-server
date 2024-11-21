const express = require('express');
const router = express.Router();
const navigationController = require('../controllers/navigationController');

router.post('/safe-route', navigationController.getSafeRoute);

module.exports = router;
