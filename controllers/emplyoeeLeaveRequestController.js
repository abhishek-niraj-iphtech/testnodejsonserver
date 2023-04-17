const EmplyoeeLeaveRequest = require("./../model/emplyoeeRequestModel");
const attcheFileuploadHelper = require("./../utils/docUplpadHelper");
const sendEmailRequest = require("./../utils/sendMail");
const EmplyoeeLeaves = require("./../model/emplyoeeLeavesModel");

exports.sendLeaveRequest = (req, res) => {
  try {
    attcheFileuploadHelper.uploadLeaveattcheFile(req, res, function (err) {
      if (err) {
        console.log(err);
        res.json({
          statusCode: 400,
          status: "failed",
        });
      } else {
        const newRequest = req.body;
        newRequest.status = "pending";
        newRequest.flag = 1;
        newRequest.remark = "";

        let attachedFile = "";

        if (req.files["attached_file"]) {
          for (let x of req.files["attached_file"]) {
            attachedFile += x.path + ",";
          }
        }

        newRequest.attached_file = attachedFile;
        EmplyoeeLeaveRequest.sendRequest(newRequest, (err, result) => {
          if (err) {
            res.json({
              statusCode: 400,
              status: "failed",
              message: "something went wrong",
            });
          } else if (result) {
            res.json({
              statusCode: 200,
              status: "success",
              message: "Leave request sent successfully",
            });
          } else {
            res.json({
              statusCode: 400,
              status: failed,
              message: "something went wrong",
            });
          }
        });
      }
    });
  } catch (err) {
    res.json({
      statusCode: 400,
      status: "failed",
    });
  }
};

exports.getAllLeaveRequest = (req, res) => {
  EmplyoeeLeaveRequest.getAllLeaveRequest((err, leaves) => {
    if (err) {
      res.json({
        statusCode: 400,
        status: "failed",
        message: "something went wrong",
      });
    } else if (leaves) {
      res.json({
        statusCode: 200,
        status: "succress",
        data: leaves,
      });
    } else {
      res.json({
        statusCode: 400,
        status: "failed",
        message: "something went wrong",
      });
    }
  });
};

const updateLeave = (req, res, statusRequest) => {
  try {
    const id = req.body.id;
    const status = statusRequest;
    EmplyoeeLeaveRequest.updateLeaveRequest(id, status, (err, result) => {
      if (err) {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "something went wrong",
        });
      } else if (result) {
        EmplyoeeLeaveRequest.getLeaveRequstedEmpIdLeaveId(
          id,
          (err, empIdLeaveId) => {
            if (err) {
              res.json({
                statusCode: 400,
                status: "failed",
                message: "something went wrong",
              });
            } else if (empIdLeaveId) {
              EmplyoeeLeaveRequest.getRenamingLives(
                empIdLeaveId[0]["emp_id"],
                empIdLeaveId[0]["leave_id"],
                (err, result) => {
                  if (err) {
                    res.json({
                      statusCode: 400,
                      status: "failed",
                      message: "something went wrong",
                    });
                  } else {
                    let renamingLeaves = result[0]["renaming_leaves"];
                    renamingLeaves = parseInt(renamingLeaves);
                    renamingLeaves = renamingLeaves - 1;

                    EmplyoeeLeaveRequest.updateRenamingLeaves(
                      renamingLeaves,
                      empIdLeaveId[0]["emp_id"],
                      empIdLeaveId[0]["leave_id"],
                      (err, result) => {
                        if (err) {
                          res.json({
                            statusCode: 400,
                            status: "failed",
                            message: "something went wrong",
                          });
                        } else {
                          console.log(result);
                          res.json({
                            statusCode: 200,
                            status: "success",
                            message: "status updated successfully",
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.json({
                statusCode: 400,
                status: "failed",
                message: "something went wrong",
              });
            }
          }
        );
      } else {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "Status not updated",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 400,
      status: "failed",
      message: "something went wrong",
    });
  }
};

exports.approvedLeaveRequest = (req, res) => {
  updateLeave(req, res, "Approved");
};
exports.declinedLeaveRequest = (req, res) => {
  updateLeave(req, res, "Declined");
};
exports.cancleLeaveRequest = (req, res) => {
  updateLeave(req, res, "Canclled");
};
exports.reCancleLeaveRequest = (req, res) => {
  updateLeave(req, res, "InProcess");
};
