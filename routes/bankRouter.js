const express = require("express");
const bankController = require("../controllers/bankController");
const authorization = require("../auth/verify_token");
const router = express.Router();

router
  .route("/addbank")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    bankController.addBank
  );

router.route("/").get(bankController.getAllBank);

module.exports = router;
