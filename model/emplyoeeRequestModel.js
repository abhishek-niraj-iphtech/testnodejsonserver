const dbConn = require("./../db/db.config");

const EmplyoeeLeaveRequest = function (emplyoeeLeaveRequest) {
  this.emp_id = emplyoeeLeaveRequest.emp_id;
  this.leave_id = emplyoeeLeaveRequest.leave_id;
  this.from_date = emplyoeeLeaveRequest.from_date;
  this.to_date = emplyoeeLeaveRequest.to_date;
  this.reason = emplyoeeLeaveRequest.raeson;
  this.status = emplyoeeLeaveRequest.status;
  this.attached_file = emplyoeeLeaveRequest.attached_file;
  this.flag = emplyoeeLeaveRequest.flag;
  this.remark = emplyoeeLeaveRequest.remark;
};

EmplyoeeLeaveRequest.sendRequest = (newLeaveRequest, result) => {
  dbConn.query(
    "Insert Into employee_leave_request set ?",
    newLeaveRequest,
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

// get leaves of

EmplyoeeLeaveRequest.getAllLeaveRequest = (result) => {
  dbConn.query(
    `SELECT employee_leave_request.id,CONCAT(employee.first_name," ",employee.last_name) As name, employee_leave_request.from_date, employee_leave_request.to_date, employee_leave_request.reason,employee_leave_request.status,employee_leave_request.remark
    From employee
    RIGHT JOIN
     employee_leave_request
    ON employee.emp_id = employee_leave_request.emp_id;`,
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
EmplyoeeLeaveRequest.updateLeaveRequest = (id, status, result) => {
  dbConn.query(
    "Update employee_leave_request Set status = COALESCE(?,status) Where id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res.changedRows);
      }
    }
  );
};

EmplyoeeLeaveRequest.getLeaveRequstedEmpIdLeaveId = (id, result) => {
  dbConn.query(
    "Select emp_id,leave_id  From employee_leave_request Where id = ?",
    id,
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

EmplyoeeLeaveRequest.getRenamingLives = (empId, leaveId, result) => {
  dbConn.query(
    "Select renaming_leaves From emplyoee_leaves Where emp_id = ? AND leave_id = ?",
    [empId, leaveId],
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

EmplyoeeLeaveRequest.updateRenamingLeaves = (
  renamingleaves,
  empId,
  leaveId,
  result
) => {
  dbConn.query(
    "UPDATE emplyoee_leaves SET renaming_leaves = COALESCE(?,renaming_leaves)   Where emp_id = ? AND leave_id = ?",
    [renamingleaves, empId, leaveId],
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

module.exports = EmplyoeeLeaveRequest;
