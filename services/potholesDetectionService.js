exports.detectPotholes = (sensorData) => {
    const potholes = [];

    sensorData.forEach((data, index) => {
        
        // Detect collision base on Z
        if (Math.abs(data.z) > 12) {
            potholes.push({
                timestamp: data.timestamp,
                latitude: data.latitude,
                longitude: data.longitude,
                severity: data.z > 15 ? 'high' : 'medium',
            });
        }
    });

    return potholes;
};
