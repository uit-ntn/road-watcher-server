const express = require('express');
const router = express.Router();
const { downloadMbtiles } = require('../controllers/mapController');

// Định nghĩa route tải file `.mbtiles`
router.get('/download-map', downloadMbtiles);

module.exports = router;
