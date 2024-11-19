const History = require("../models/History");

// CREATE a new history record
exports.createHistoryRecord = async (req, res) => {
    try {
        const newRecord = new History(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all history records
exports.getAllHistoryRecords = async (req, res) => {
    try {
        const historyRecords = await History.find();
        res.status(200).json(historyRecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a single history record by ID
exports.getHistoryRecordById = async (req, res) => {
    try {
        const historyRecord = await History.findById(req.params.id);
        if (!historyRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json(historyRecord);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a history record by ID
exports.updateHistoryRecordById = async (req, res) => {
    try {
        const updatedRecord = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json(updatedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a history record by ID
exports.deleteHistoryRecordById = async (req, res) => {
    try {
        const deletedRecord = await History.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
