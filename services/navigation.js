const { calculateDistance } = require('../utils/geoUtils');

//  find optimal route
exports.findSafeRoute = (routeCoordinates, potholes) => {
    const safeRoute = [];

    routeCoordinates.forEach((point) => {
        const { latitude, longitude } = point;

        // check potholes near
        const nearbyPotholes = potholes.filter((pothole) => {
            const distance = calculateDistance(
                latitude,
                longitude,
                pothole.latitude,
                pothole.longitude
            );
            return distance < 0.05; // about 50m
        });

        if (nearbyPotholes.length === 0) {
            // Nếu không có ổ gà gần đó, thêm điểm này vào lộ trình an toàn
            safeRoute.push(point);
        }
    });

    return safeRoute;
};
