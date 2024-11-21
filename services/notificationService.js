exports.isDangerousArea = async (latitude, longitude) => {
    const potholes = await Pothole.find({
        latitude: { $gte: latitude - 0.001, $lte: latitude + 0.001 },
        longitude: { $gte: longitude - 0.001, $lte: longitude + 0.001 },
    });

    return potholes.length > 5; // Ngưỡng để xác định khu vực nguy hiểm
};
