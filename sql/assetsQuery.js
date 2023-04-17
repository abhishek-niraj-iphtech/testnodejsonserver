const addAssets = `INSERT INTO assets set ?`;
const getAllAssets = `Select * from assets WHERE delete_flag = 0`;
const getAsset = `Select * from assets where id = ? AND delete_flag = 0`;
const updateAsset = `UPDATE assets SET device_type = COALESCE(?,device_type),system_name = COALESCE(?,system_name),serial_number = COALESCE(?,serial_number),other = COALESCE(?,other),quantity = COALESCE(?,quantity) WHERE id = ? AND delete_flag = 0`;
const deleteAsset = `UPDATE assets SET delete_flag = 1 WHERE id = ?`;
module.exports = {
  addAssets,
  getAllAssets,
  getAsset,
  updateAsset,
  deleteAsset,
};
