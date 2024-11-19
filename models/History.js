const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({
    historical_record_id: { type: String, unique: true, required: true },
    pothole_id: { type: String, unique: true, required: true },
    status: { type: String, required: true },
    last_updated: { type: Date, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    severity: { type: String, required: true }
})


module.exports = mongoose.model("history",HistorySchema);
