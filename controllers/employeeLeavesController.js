const EmplyoeeLeaves = require("./../model/emplyoeeLeavesModel");
const Leaves = require("./../model/leavesModel");
const connection = require("./../db/db.config");
exports.addassiginleavestoEmp = (req, res) => {
  const { emp_id, data } = req.body;
  const ids = data.map((item) => item.id);

  Leaves.getById(ids, (err, leaves) => {
    if (err) {
      console.error("Error executing SELECT query: ", err);
      return;
    }

    const values = leaves.map((data) => [
      emp_id,
      data.id,
      data.days,
      data.days,
    ]);
    EmplyoeeLeaves.addEmplyoeeLeaves(values, (err, leaves) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          statusCode: 200,
          status: "success",
          message: "leaves assigin successfully",
        });
      }
    });
  });
};

exports.getEmployeeleave = (req, res) => {
  const empId = req.body.emp_id;
  EmplyoeeLeaves.getLeaves(empId, (err, leaves) => {
    if (err) {
      res.json({
        statusCode: 400,
        status: "failed",
        message: "something went wrong",
      });
    } else if (leaves.length > 0) {
      res.json({
        statusCode: 200,
        status: "success",
        data: leaves,
      });
    } else {
      res.json({
        statusCode: 400,
        status: "success",
        message: "No Data",
      });
    }
  });
};
