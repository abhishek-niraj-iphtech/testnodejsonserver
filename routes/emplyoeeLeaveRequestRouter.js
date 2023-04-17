const express = require("express");
const emplyoeeLeaverequestController = require("./../controllers/emplyoeeLeaveRequestController");
const authorization = require("./../auth/verify_token");

const router = express.Router();

router
  .route("/leaveRequest")
  .post(emplyoeeLeaverequestController.sendLeaveRequest)
  .get(emplyoeeLeaverequestController.getAllLeaveRequest);

router
  .route("/getAllLeaveRequest")
  .post(emplyoeeLeaverequestController.getAllLeaveRequest);

router
  .route("/approved")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    emplyoeeLeaverequestController.approvedLeaveRequest
  );

router
  .route("/declined")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    emplyoeeLeaverequestController.declinedLeaveRequest
  );

router
  .route("/cancelled")
  .post(
    authorization.checkToken,
    authorization.checkemplyoee,
    emplyoeeLeaverequestController.cancleLeaveRequest
  );

router
  .route("/cancelapprovedleave")
  .post(
    authorization.checkToken,
    authorization.checkemplyoee,
    emplyoeeLeaverequestController.cancleLeaveRequest
  );

module.exports = router;
