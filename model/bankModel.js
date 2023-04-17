const dbConn = require("./../db/db.config");
const bankQuery = require("./../sql/bankQuery");
const Bank = function (bank) {
  this.account_number = bank.account_number;
  this.name_on_passbook = bank.name_on_passbook;
  this.ifsccode = bank.ifsccode;
  this.branch_name = bank.branch_name;
  this.bank_name = bank.bank_name;
  this.emp_id = bank.emp_id;
};

/********************************************** Add Bank ***************************************************************************************** */

Bank.addBank = (newBank, result) => {
  dbConn.query(bankQuery.addBank, newBank, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

/***************************************** Update Bank details ******************************************************************** */

Bank.updateBankDetail = (id, bank, result) => {};

/****************************************** Get all Bank ************************************************************************** */
Bank.getAllBank = (result) => {
  dbConn.query(bankQuery.getAllBank, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
module.exports = Bank;
