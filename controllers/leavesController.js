const Leaves = require("./../model/leavesModel");
const error = require("./../error/error");
const xlsx = require("xlsx");
exports.addLeave = (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      res.status(400).json({ error: "Invalid data format" });
      return;
    }
    const values = data.map((d) => [d.leave_type, d.days]);

    console.log(values);

    Leaves.addLeaves(values, (err, leaves) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({
            statusCode: 400,
            status: "failed",
            message: "Duplicate entry",
          });
        } else if (err.code === "ER_BAD_NULL_ERROR") {
          res.json({
            statusCode: 400,
            status: "failed",
            message: "please fill all mandatory fields",
          });
        } else {
          res.json({
            statusCode: 403,
            status: "failed",
            message: "Duplicate entry",
            data: employee,
          });
        }
      } else {
        res.json({
          statusCode: 200,
          status: "success",
          message: "Leaves added successfully",
        });
      }
    });
  } catch (err) {
    res.json({
      statusCode: 400,
      status: "failed",
      message: "something wentwrong",
    });
  }
};

exports.getAllLeaves = (req, res) => {
  try {
    Leaves.getAllLeaves((err, leaves) => {
      if (err) {
        error.sometgingWentWrong(req, res);
      } else if (leaves.length > 0) {
        res.json({
          statusCode: 200,
          status: "success",
          data: leaves,
        });
      } else {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "No data",
        });
      }
    });
  } catch (err) {
    console.log(err);
    error.sometgingWentWrong(req, res);
  }
};

exports.getLeave = (req, res) => {
  const id = req.body.id;
  Leaves.getById(id, (err, leaves) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        statusCode: 200,
        status: "success",
        data: leaves,
      });
    }
  });
};

exports.xldata = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  if (data.length === 0) {
    return res.status(400).json({ error: "No data in file" });
  }
  const expectedColumns = ["leave_type", "days"];
  const sheetColumns = Object.keys(data[0]);
  if (!expectedColumns.every((column) => sheetColumns.includes(column))) {
    console.log("Expected columns:", expectedColumns);
    console.log("Actual columns:", sheetColumns);
    return res.status(400).json({ error: "Invalid Excel sheet format" });
  }
  const columnMap = {
    leavtype: "leave_type",
    days: "days ",
  };

  const values = data.map((row) => {
    return [row[columnMap.leavtype], row[columnMap.days]];
  });
  Leaves.xldata(values, (err, leaves) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    const numInsertedRows = leaves.affectedRows;
    if (numInsertedRows === 0) {
      res.json({ message: "No new data inserted (duplicate data)" });
    } else {
      res.json({ message: `Inserted ${numInsertedRows} new rows` });
    }
  });
};
