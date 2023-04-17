const dbConn = require("./../db/db.config");
const leavesQuery = require("./../sql/leavesQuery");
var Leaves = function (leaves) {
  this.leave_type = leaves.leave_type;
  this.days = leaves.days;
};

/********************************** Add Leave **************************************************************/

Leaves.addLeaves = (newLeaves, result) => {
  dbConn.query(leavesQuery.addLeaves, [newLeaves], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

/********************************** Get All Leave **************************************************************/

Leaves.getAllLeaves = (result) => {
  dbConn.query(leavesQuery.getAllLeaves, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(res);
      result(null, res);
    }
  });
};

Leaves.getById = (ids, result) => {
  dbConn.query(
    `Select * from leaves where id IN (${ids.join(",")})`,
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

Leaves.addLeavesByexclFile = (newLeaves, result) => {
  dbConn.query(
    `INSERT INTO leaves (leave_type, days) VALUES (?, ?)`,
    [newLeaves],
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
/*********************************** Leaves assigin to employee ********************************************************************** */

Leaves.xldata = (data, result) => {
  dbConn.query(
    `INSERT IGNORE INTO leaves (leave_type, days) VALUES ?`,
    [data],
    (err, callback) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, callback);
      }
    }
  );
};

module.exports = Leaves;
