const dbConn = require("./../db/db.config");

const EmplyoeeLeaves = function (empleaves) {
  this.emp_id = empleaves.emp_id;
  this.leave_id = empleaves.leave_id;
  this.total_leaves = empleaves.total_leaves;
  this.renaming_leaves = empleaves.renaming_leaves;
};
/****************************** Assigin leaves ***************************************************************************/

EmplyoeeLeaves.addEmplyoeeLeaves = (newLeaves, result) => {
  dbConn.query(
    "INSERT INTO emplyoee_leaves (emp_id,leave_id,total_leaves,renaming_leaves) Values ? ",
    [newLeaves],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

//***************************** Emplyoee leave data *******************************************************************************/

EmplyoeeLeaves.getLeaves = (id, result) => {
  dbConn.query(
    "SELECT emplyoee_leaves.leave_id,leaves.leave_type, emplyoee_leaves.total_leaves, emplyoee_leaves.renaming_leaves FROM Leaves JOIN emplyoee_leaves ON Leaves.id = emplyoee_leaves.leave_id WHERE emplyoee_leaves.emp_id = ? GROUP BY leaves.leave_type",
    [id],
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

EmplyoeeLeaves.updateEmployeeLeave = (empId, result) => {
  this.getLeaves(empId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result(res);
    }
  });
};

module.exports = EmplyoeeLeaves;
