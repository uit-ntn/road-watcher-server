const express = require('express');
const router = express.Router();
const potholeController = require('../controllers/potholeController');

// Create Pothole
router.post('/', potholeController.createPothole);

// Read All Potholes
router.get('/', potholeController.getAllPotholes);

// Read Pothole by ID
router.get('/:id', potholeController.getPotholeById);

// Update Pothole
router.put('/:id', potholeController.updatePothole);

// Delete Pothole
router.delete('/:id', potholeController.deletePothole);

// Check Pothole by GPS Coordinates
router.post('/check', potholeController.checkPotholeByCoordinates);

// Detect Potholes
router.post('/detect', potholeController.detectPotholeFromSensor);

// Get potholes statistics by day
router.get('/statistics/day', potholeController.getPotholesByDay);

// Get potholes statistics by week
router.get('/statistics/week', potholeController.getPotholesByWeek);

// Get potholes statistics by month
router.get('/statistics/month', potholeController.getPotholesByMonth);

module.exports = router;
