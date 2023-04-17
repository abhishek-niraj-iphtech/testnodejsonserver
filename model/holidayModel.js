const dbConn = require("./../db/db.config");
const holidaysQuery = require("./../sql/holidaysQuery");
const Holiday = function (holiday) {
  this.start_date = holiday.start_date;
  this.end_date = holiday.end_date;
  this.holiday_name = holiday.holiday_name;
};
/*************************************************** Add Holidays *******************************************************************************/
Holiday.addHoliday = (newHoliday, result) => {
  dbConn.query(holidaysQuery.addHolidays, newHoliday, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
/*************************************************** Get All Holidays  *******************************************************************************/

Holiday.getAllHoliday = (result) => {
  dbConn.query(holidaysQuery.getAllHolidays, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Holiday;
