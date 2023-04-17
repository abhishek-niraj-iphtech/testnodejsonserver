const addTimesheet = "INSERT INTO timesheet set ?";
const checkOut = `UPDATE timesheet SET check_out = ?, total_time = ? WHERE id  = ? `;
const getTimeSheet = `Select id ,check_in,check_out,total_time,status FROM timesheet WHERE emp_id = ? AND check_out IS NULL`;
const checkCheckOut = `Select check_out From timesheet Where emp_id = 5 AND check_out IS NULL `;
module.exports = {
  addTimesheet,
  checkOut,
  getTimeSheet,
  checkCheckOut,
};
