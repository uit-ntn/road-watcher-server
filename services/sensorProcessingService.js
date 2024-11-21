// Handle data from sensor
exports.processSensorData = (accelerometerData) => {

// filter noisy data

    const filteredData = accelerometerData.map((data) => ({
        ...data,

        // reduce noisy
        x: data.x * 0.9,
        y: data.y * 0.9,
        z: data.z * 0.9,
    }));
    return filteredData;
};
