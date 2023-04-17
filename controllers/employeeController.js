const Employee = require("./../model/employeeModel");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const imageUpload = require("./../utils/docUplpadHelper");
const createdDate = require("./../utils/checkInDateHelper");
const splitFunction = require("./../utils/splitFunctionHelper");

/******************************************* Get All Employee Data ********************************************************************* */

exports.getAllEmployee = (req, res) => {
  Employee.finadAll((err, employee) => {
    if (err) {
      res.json({
        statusCode: 400,
        status: "failed",
        message: "something went wrong",
        data: employee,
      });
    } else {
      res.json({
        statusCode: 200,
        status: "success",
        result: employee.length,
        data: employee,
      });
    }
  });
};

/*********************************************** Create employee ****************************************************************************/

exports.createUser = (req, res) => {
  try {
    const todayDate = new Date();
    const currentDate = todayDate.getDate().toString().padStart(2, "0");
    const currentMonth = (todayDate.getMonth() + 1).toString().padStart(2, "0");

    imageUpload.upload(req, res, function (err) {
      if (err) {
        console.log(err);
        res.json({
          statusCode: 400,
          status: "failed",
        });
      } else {
        const newEmp = req.body;
        const salt = genSaltSync(10);

        let postQualificationDoc = "";
        let gaQualiDoc = "";
        let hiQualiDoc = "";
        let inQualiDoc = "";
        let panFileDoc = "";
        let adharFileDoc = "";
        let passportFileDoc = "";
        let dlVoterFileDoc = "";

        if (req.files["po_quali_doc_name"]) {
          for (let x of req.files["po_quali_doc_name"]) {
            postQualificationDoc += x.path + ",";
          }
        }
        if (req.files["ga_quali_doc_name"]) {
          for (let x of req.files["ga_quali_doc_name"]) {
            gaQualiDoc += x.path + ",";
          }
        }
        if (req.files["hi_quali_doc_name"]) {
          for (let x of req.files["hi_quali_doc_name"]) {
            hiQualiDoc += x.path + ",";
          }
        }
        if (req.files["in_quali_doc_name"]) {
          for (let x of req.files["in_quali_doc_name"]) {
            inQualiDoc += x.path + ",";
          }
        }

        if (req.files["pan_file_name"]) {
          for (let x of req.files["pan_file_name"]) {
            panFileDoc += x.path + ",";
          }
        }
        if (req.files["adhar_file_name"]) {
          for (let x of req.files["adhar_file_name"]) {
            adharFileDoc += x.path + ",";
          }
        }
        if (req.files["passport_file_name"]) {
          for (let x of req.files["passport_file_name"]) {
            passportFileDoc += x.path + ",";
          }
        }
        if (req.files["dl_voter_id_file"]) {
          for (let x of req.files["dl_voter_id_file"]) {
            dlVoterFileDoc += x.path + ",";
          }
        }

        newEmp.po_quali_doc_name = postQualificationDoc;
        newEmp.ga_quali_doc_name = gaQualiDoc;
        newEmp.hi_quali_doc_name = hiQualiDoc;
        newEmp.in_quali_doc_name = inQualiDoc;

        newEmp.pan_file_name = panFileDoc;
        newEmp.adhar_file_name = adharFileDoc;
        newEmp.passport_file_name = passportFileDoc;
        newEmp.dl_voter_id_file = dlVoterFileDoc;
        const dateofBirth = req.body.dob;

        const extratDateOfBirth = dateofBirth.split("-");
        const dateOfDateOfBirth = extratDateOfBirth[0];
        const monthOfDateOfBirth = extratDateOfBirth[1];
        var empIdPrefix =
          "IPH" +
          currentDate +
          currentMonth +
          dateOfDateOfBirth +
          monthOfDateOfBirth;

        if (newEmp.password) {
          newEmp.password = hashSync(newEmp.password, salt);
        }

        let suffix = 1;

        function create(id) {
          newEmp.emp_id = id;
          Employee.create(newEmp, (err, employee) => {
            if (employee != null) {
              res.status(201).json({
                statusCode: 201,
                status: "success",
                message: "Employee addedd successfully",
                emp_id: newEmp.emp_id,
              });
            } else {
              if (err.code === "ER_DUP_ENTRY") {
                var isDuplicate = err.sqlMessage.includes("for key 'emp_id'");
                if (isDuplicate) {
                  if (isDuplicate) {
                    console.log(empIdPrefix + suffix);
                    suffix = suffix + 1;
                    check(empIdPrefix + suffix);
                  }
                } else {
                  console.log(err);
                  res.json({
                    statusCode: 400,
                    status: "failed",
                    message: "Duplicate entry",
                  });
                }
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
                  data: employee,
                });
              }
            }
          });
        }

        function check(data) {
          Employee.userAvailability(data, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              newEmp.emp_id = data;
              create(newEmp.emp_id);
            }
          });
        }

        check(empIdPrefix + suffix);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/************************************************ Find Employee By It's Id *************************************************************** */

exports.findById = (req, res) => {
  try {
    const id = req.body.emp_id;
    Employee.findById(id, (err, employee) => {
      if (err) {
        res.status(400).json({
          statusCode: 400,
          status: "failed",
          data: employee,
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          status: "success",
          data: employee,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/************************************************ Update Employee Data By It's Id ************************************************************ */

exports.update = (req, res) => {
  try {
    imageUpload.upload(req, res, function (err) {
      if (err) {
        console.log(err);
        res.json({
          statusCode: 400,
          status: "failed",
        });
      } else {
        const newEmp = req.body;
        const salt = genSaltSync(10);

        let postQualificationDoc = "";
        let gaQualiDoc = "";
        let hiQualiDoc = "";
        let inQualiDoc = "";
        let panFileDoc = "";
        let adharFileDoc = "";
        let passportFileDoc = "";
        let dlVoterFileDoc = "";

        console.log("---------------------");
        console.log(req.files);
        if (req.files["po_quali_doc_name"]) {
          for (let x of req.files["po_quali_doc_name"]) {
            postQualificationDoc += x.path + ",";
          }
        }
        if (req.files["ga_quali_doc_name"]) {
          for (let x of req.files["ga_quali_doc_name"]) {
            gaQualiDoc += x.path + ",";
          }
        }
        if (req.files["hi_quali_doc_name"]) {
          for (let x of req.files["hi_quali_doc_name"]) {
            hiQualiDoc += x.path + ",";
          }
        }
        if (req.files["in_quali_doc_name"]) {
          for (let x of req.files["in_quali_doc_name"]) {
            inQualiDoc += x.path + ",";
          }
        }

        if (req.files["pan_file_name"]) {
          for (let x of req.files["pan_file_name"]) {
            panFileDoc += x.path + ",";
          }
        }
        if (req.files["adhar_file_name"]) {
          for (let x of req.files["adhar_file_name"]) {
            adharFileDoc += x.path + ",";
          }
        }
        if (req.files["passport_file_name"]) {
          for (let x of req.files["passport_file_name"]) {
            passportFileDoc += x.path + ",";
          }
        }
        if (req.files["dl_voter_id_file"]) {
          for (let x of req.files["dl_voter_id_file"]) {
            dlVoterFileDoc += x.path + ",";
          }
        }

        newEmp.po_quali_doc_name = postQualificationDoc;
        newEmp.ga_quali_doc_name = gaQualiDoc;
        newEmp.hi_quali_doc_name = hiQualiDoc;
        newEmp.in_quali_doc_name = inQualiDoc;

        newEmp.pan_file_name = panFileDoc;
        newEmp.adhar_file_name = adharFileDoc;
        newEmp.passport_file_name = passportFileDoc;
        newEmp.dl_voter_id_file = dlVoterFileDoc;
        if (newEmp.password) {
          newEmp.password = hashSync(newEmp.password, salt);
        }

        Employee.update(
          req.body.emp_id,
          new Employee(req.body),
          function (err, employee) {
            if (err) {
              console.log(err);
              res.json({
                statusCode: 400,
                status: "failed ",
                message: "somethingwent wrong",
              });
            } else {
              console.log(employee);
              res.json({
                statusCode: 200,
                status: "success",
                message: "user successfully updated",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/*********************************************** Login Employee By It's Email And Password ******************************************************************* */

exports.login = (req, res) => {
  const body = req.body;
  Employee.getEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results.length) {
      return res.status(403).json({
        statusCode: 403,
        status: "failed",
        message: "invalid email or password",
      });
    }

    const result = compareSync(body.password, results[0]["password"]);

    if (result) {
      results.password = undefined;

      const jsontoken = sign({ result: results }, "iph123", {
        expiresIn: "10h",
      });
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "login successfully",
        token: jsontoken,
        userType: results[0]["emp_role"],
      });
    } else {
      return res.status(403).json({
        statusCode: 403,
        status: "failed",
        message: "Invalid email or password",
      });
    }
  });
};

exports.getEmplyoeeAssignedLeaveBeforeAssigned = (req, res) => {
  try {
    Employee.getEmplyoeeAssignedLeave((err, result) => {
      if (err) {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "something went wrong",
        });
      } else {
        res.json({
          statusCode: 200,
          status: "success",
          data: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 400,
      status: "success",
      message: "something went wrong",
    });
  }
};
