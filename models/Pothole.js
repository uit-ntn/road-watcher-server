const mongoose = require('mongoose');

const PotholeSchema = new mongoose.Schema({
    pothole_id: { type: String, unique: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    detected_time: { type: Date, default: Date.now },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    acceleration_x: { type: Number, required: true },
    acceleration_y: { type: Number, required: true },
    acceleration_z: { type: Number, required: true },
    gps_accuracy: { type: Number, required: true },
    detected_by_user_id: { type: String, required: true },
    confirmed_by_user: { type: Boolean, default: false },
    manual_reports: [
        {
            user_id: { type: String, required: true },
            report_time: { type: Date, default: Date.now },
            description: { type: String }
        }
    ]
});

module.exports = mongoose.model('pothole', PotholeSchema);
