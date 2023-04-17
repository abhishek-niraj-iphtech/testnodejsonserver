const express = require("express");
const holidayController = require("./../controllers/holidayController");
const authorization = require("../auth/verify_token");
const router = express.Router();

router
  .route("/")
  .get(
    authorization.checkToken,
    authorization.checkAdmin,
    holidayController.getAllHolidays
  );

router
  .route("/addholiday")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    holidayController.addHolidays
  );

module.exports = router;
