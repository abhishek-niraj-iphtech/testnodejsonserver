const Timesheet = require("./../model/timeSheetModel");
const lateOnTimeHelper = require("./../utils/lateOnTimehelper");
const workHour = require("./../utils/workHourHelper");
const checkInDate = require("./../utils/checkInDateHelper");

/********************************************  Check In    ********************************************************************************** */

exports.addTimeSheet = (req, res) => {
  try {
    const newTimesheet = new Timesheet(req.body);

    Timesheet.checkCheckOut(newTimesheet.emp_id, (err, data) => {
      if (err) {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "something went wrong",
        });
      } else {
        if (data.length > 0 && data[0].check_out == null) {
          res.json({
            statusCode: 400,
            status: "failed",
            message: "Please check out",
          });
        } else {
          const date = new Date();
          newTimesheet.check_in = date.toISOString();
          newTimesheet.status = lateOnTimeHelper;
          newTimesheet.date = checkInDate;
          Timesheet.addTimeSheeet(newTimesheet, (err, timesheet) => {
            if (timesheet) {
              res.json({
                statusCode: 200,
                status: "success",
                message: "check in successfully ",
              });
            } else if (err.code === "ER_DUP_ENTRY") {
              console.log(err);
              res.json({
                statusCode: 403,
                status: "failed",
                message: "Duplicate entry",
              });
            } else if (err.code === "ER_BAD_NULL_ERROR") {
              console.log(err);
              res.json({
                statusCode: 400,
                status: "failed",
                message: "please fill all mandatory fields",
              });
            } else {
              console.log(err);
              res.status(400).json({
                statusCode: 400,
                status: "failed",
                message: "sometging went wrong",
              });
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};
/********************************************  Check Out    ********************************************************************************** */

exports.punchOut = (req, res) => {
  try {
    const id = req.body.emp_id;
    Timesheet.checkCheckOut(id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length > 0 && data[0].check_out == null) {
          Timesheet.gettimesheet(id, (err, timesheet) => {
            if (timesheet != null) {
              const date = new Date();
              const newTimesheet = new Timesheet(req.body);
              newTimesheet.check_out = date.toISOString();
              newTimesheet.total_time = workHour(timesheet[0].check_in);
              if (
                req.body.constructor === Object &&
                Object.keys(req.body).length === 0
              ) {
                res.json({
                  statusCode: 400,
                  status: "failed",
                  message: "Please provide all required field",
                });
              } else {
                Timesheet.punchOut(
                  timesheet[0].id,
                  new Timesheet(newTimesheet),
                  function (err, timesheet) {
                    if (err) {
                      console.log(err);
                      res.send(err);
                    } else {
                      res.json({
                        statusCode: 200,
                        status: "success",
                        message: "check out successfully",
                      });
                    }
                  }
                );
              }
            } else {
              console.log(err);
              res.json({
                statusCode: 400,
                status: "failed",
                message: "something went wrong",
              });
            }
          });
        } else {
          console.log(err);
          res.json({
            statusCode: 400,
            status: "failed",
            message: "Please check in",
          });
        }
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
