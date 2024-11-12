const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.post("/", historyController.createHistoryRecord);

router.get("/", historyController.getAllHistoryRecords);

router.get("/:id", historyController.getHistoryRecordById);

router.put("/:id", historyController.updateHistoryRecordById);

router.delete("/:id", historyController.deleteHistoryRecordById);

module.exports = router;
