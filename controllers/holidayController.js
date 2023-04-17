const Holiday = require("./../model/holidayModel");

/*************************************************** Add Holidays *******************************************************************************/
exports.addHolidays = (req, res) => {
  try {
    const newHoliday = new Holiday(req.body);
    Holiday.addHoliday(newHoliday, (err, holiday) => {
      if (holiday != null) {
        res.json({
          statusCode: 201,
          status: "success",
          message: "Holiday added successfully",
          data: newHoliday,
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
            message: "sometging went wrong",
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 400,
      status: "failed",
      message: "sometging went wrong",
    });
  }
};

/*************************************************** Get All Holidays  *******************************************************************************/
exports.getAllHolidays = (req, res) => {
  try {
    Holiday.getAllHoliday((err, holiday) => {
      if (err) {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "sometging went wrong",
        });
      } else {
        res.json({
          statusCode: 200,
          status: "success",
          data: holiday,
        });
      }
    });
  } catch (err) {
    console.lof(err);
  }
};
