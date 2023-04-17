const Bank = require("./../model/bankModel");

/********************************************** Add Bank ***************************************************************************************** */
exports.addBank = (req, res) => {
  try {
    const newBank = new Bank(req.body);
    Bank.addBank(newBank, (err, bank) => {
      if (bank != null) {
        res.json({
          statusCode: 201,
          status: "success",
          message: "Bank added successfully",
          data: newBank,
        });
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({
            statusCode: 403,
            status: "failed",
            message: "Duplicate entry",
          });
        } else if (err.code === "ER_BAD_NULL_ERROR") {
          res.json({
            statusCode: 400,
            status: "failed",
            message: "please fill all mandatory fields",
          });
        } else if (err) {
          console.log(err);
          res.status(400).json({
            statusCode: 400,
            status: "failed",
            message: "something went wrong",
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      status: "failed",
      message: "something went wrong",
    });
  }
};

/****************************************** Get all Bank ************************************************************************** */

exports.getAllBank = (req, res) => {
  try {
    Bank.getAllBank((err, bank) => {
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
          data: bank,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
