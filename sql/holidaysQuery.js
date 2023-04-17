const addHolidays = `INSERT into holidays set ?`;
const getAllHolidays = `SELECT * FROM holidays`;
module.exports = {
  addHolidays,
  getAllHolidays,
};
