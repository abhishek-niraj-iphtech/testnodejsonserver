const express = require("express");
const timeSheetController = require("./../controllers/timeSheetController");
const router = express.Router();

router.route("/punch_in").post(timeSheetController.addTimeSheet);
router.route("/punch_out").post(timeSheetController.punchOut);

module.exports = router;
