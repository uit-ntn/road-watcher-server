const Pothole = require('../models/Pothole');
const { findSafeRoute } = require('../services/navigationService');

exports.getSafeRoute = async (req, res) => {
    try {
        const { routeCoordinates } = req.body;

        // Lấy dữ liệu ổ gà từ cơ sở dữ liệu
        const potholes = await Pothole.find();

        // Tính lộ trình an toàn
        const safeRoute = findSafeRoute(routeCoordinates, potholes);

        res.status(200).json({
            message: 'Safe route calculated',
            safeRoute,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating route', error });
    }
};