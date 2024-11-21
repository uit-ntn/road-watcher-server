const Pothole = require('../models/Pothole');
const { processSensorData } = require('../services/sensorProcessingService');
const { detectPotholes } = require('../services/potholesDetectionService');

// Create Pothole
exports.createPothole = async (req, res) => {
    try {
        const pothole = new Pothole(req.body);
        await pothole.save();
        res.status(201).json(pothole);
    } catch (error) {
        res.status(500).json({ message: 'Error creating pothole', error });
    }
};

// Read All Potholes
exports.getAllPotholes = async (req, res) => {
    try {
        const potholes = await Pothole.find();
        res.json(potholes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching potholes', error });
    }
};

// Read Pothole by ID
exports.getPotholeById = async (req, res) => {
    try {
        const pothole = await Pothole.findById(req.params.id);
        if (!pothole) {
            return res.status(404).json({ message: 'Pothole not found' });
        }
        res.json(pothole);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pothole', error });
    }
};

// Update Pothole
exports.updatePothole = async (req, res) => {
    try {
        const updatedPothole = await Pothole.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPothole) {
            return res.status(404).json({ message: 'Pothole not found' });
        }
        res.json(updatedPothole);
    } catch (error) {
        res.status(500).json({ message: 'Error updating pothole', error });
    }
};

// Xóa ổ gà Delete Pothole
exports.deletePothole = async (req, res) => {
    try {
        const deletedPothole = await Pothole.findByIdAndDelete(req.params.id);
        if (!deletedPothole) {
            return res.status(404).json({ message: 'Pothole not found' });
        }
        res.json({ message: 'Pothole deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pothole', error });
    }
};

// Check Pothole by GPS Coordinates
exports.checkPotholeByCoordinates = async (req, res) => {
    const { latitude, longitude, accuracy } = req.body;

    try {
    
        const nearbyPotholes = await Pothole.find({
            latitude: { $gte: latitude - 0.0001, $lte: latitude + 0.0001 },
            longitude: { $gte: longitude - 0.0001, $lte: longitude + 0.0001 }
        });

        if (nearbyPotholes.length > 0) {
            return res.json({ found: true, potholes: nearbyPotholes });
        }

        res.json({ found: false });
    } catch (error) {
        res.status(500).json({ message: 'Error checking potholes', error });
    }
};



exports.detectPotholeFromSensor = async (req, res) => {
    try {
        const rawSensorData = req.body.sensorData;

       // handle data from sensor
        const processedData = processSensorData(rawSensorData);

        // detect potholes
        const potholes = detectPotholes(processedData);

        res.status(200).json({
            message: 'Pothole detection complete',
            potholes,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error detecting potholes', error });
    }
};