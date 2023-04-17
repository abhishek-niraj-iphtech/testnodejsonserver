const express = require("express");
const employeeLeaveController = require("./../controllers/employeeLeavesController");
const router = express.Router();

router
  .route("/assiginleaves")
  .post(employeeLeaveController.addassiginleavestoEmp);

router
  .route("/gatemployeeleaves")
  .post(employeeLeaveController.getEmployeeleave);

module.exports = router;
