const express = require("express");
const employeeController = require("./../controllers/employeeController");
const authorization = require("./../auth/verify_token");
const router = express.Router();

router
  .route("/")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    employeeController.getAllEmployee
  )
  .patch(
    authorization.checkToken,
    authorization.checkAdmin,
    employeeController.update
  );

router
  .route("/getEmplyoeeById")
  .post(
    authorization.checkBody,
    authorization.checkToken,
    authorization.checkUser,
    employeeController.findById
  );

router
  .route("/toAssigned")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    employeeController.getEmplyoeeAssignedLeaveBeforeAssigned
  );
router
  .route("/create")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    employeeController.createUser
  );
router.route("/login").post(employeeController.login);

module.exports = router;
