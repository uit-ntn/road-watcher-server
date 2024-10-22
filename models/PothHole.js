const mongoose = require("mongoose");

const PotholeSchema = mongoose.Schema({
    pothole_id: { type: String, unique: true, required: true },
    longiture: { type: Float64Array, required: true },
    latitude: { type: Float64Array, required: true },
    detected_time: { type: Date, required: true },
    severity: { type: String, required: true },
    acceleration_x: { type: Float64Array, required: true },
    acceleration_y: { type: Float64Array, required: true },
    acceleration_z: { type: Float64Array, requried: true },
    gps_accuracy: { type: Float64Array, requried: true },
    detected_by_user_id: { type: String, required: true },
    confirmed_by_user: { type: Boolean },
    munual_reports: [
        {
            user_id: { type: String },
            report_time: { type: String },
            description: { type: String }
        }
    ]


})


module.exports = mongoose.model("pothole", PotholeSchema)