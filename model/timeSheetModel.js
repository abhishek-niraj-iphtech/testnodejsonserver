const dbConn = require("./../db/db.config");
const timeSheetQuery = require("./../sql/timesheetQuery");
var Timesheet = function (timesheet) {
  this.check_in = timesheet.check_in;
  this.check_out = timesheet.check_out;
  this.total_time = timesheet.total_time;
  this.status = timesheet.status;
  this.emp_id = timesheet.emp_id;
};
/********************************************  Check In    ********************************************************************************** */
Timesheet.addTimeSheeet = (newTimesheet, result) => {
  dbConn.query(timeSheetQuery.addTimesheet, newTimesheet, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

/********************************************     Check Out    ********************************************************************************** */

Timesheet.punchOut = (id, timesheet, result) => {
  dbConn.query(
    timeSheetQuery.checkOut,
    [timesheet.check_out, timesheet.total_time, id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
/********************************************   Get Time Sheet    ********************************************************************************** */

Timesheet.gettimesheet = (emp_id, result) => {
  dbConn.query(timeSheetQuery.getTimeSheet, emp_id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

/********************************************  Check Check Out  ********************************************************************************** */

Timesheet.checkCheckOut = (id, result) => {
  dbConn.query(timeSheetQuery.checkCheckOut, [id], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
module.exports = Timesheet;
