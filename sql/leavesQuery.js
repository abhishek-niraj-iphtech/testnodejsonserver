const addLeaves = `Insert Into leaves (leave_type,days) Values ?`;
const getAllLeaves = `Select * from leaves`;
module.exports = {
  addLeaves,
  getAllLeaves,
};
