const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    registered_on: { type: Date, default: Date.now },
    pothole_reports: [
        {
            pothole_id: { type: String },
            report_time: { type: Date }
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
