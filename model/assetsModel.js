const dbConn = require("./../db/db.config");
const assetQuery = require("./../sql/assetsQuery");
var Asset = function (asset) {
  this.id = asset.id;
  this.device_type = asset.device_type;
  this.system_name = asset.system_name;
  this.serial_number = asset.serial_number;
  this.other = asset.other;
  this.quantity = asset.quantity;
  this.delete_flag = asset.delete_flag;
};

/********************************* Add assets ********************************************************************************/

Asset.create = (newAsset, result) => {
  try {
    dbConn.query(assetQuery.addAssets, newAsset, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/********************************** Get All Assets ***************************************************************************************************/
Asset.getAllAssets = (result) => {
  dbConn.query(assetQuery.getAllAssets, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

/*********************************** Get a P1articulat Assets ************************************************************************************** */

Asset.findById = (id, result) => {
  dbConn.query(assetQuery.getAsset, id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else if (res.length === 0) {
      result("error");
    } else {
      result(null, res);
    }
  });
};

/************************************* Update Assets By It's Id ************************************************************************************ */
Asset.update = (id, asset, result) => {
  Asset.findById(id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      dbConn.query(
        assetQuery.updateAsset,
        [
          asset.device_type,
          asset.system_name,
          asset.serial_number,
          asset.other,
          asset.quantity,
          id,
        ],
        function (err, res) {
          if (err) {
            console.log("Error", err);
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    }
  });
};

/************************************* Delete Assets By It's Id ************************************************************************************ */

Asset.delete = (id, result) => {
  Asset.findById(id, (err, res) => {
    if (err) {
      console.log("Error", err);
      result(err, null);
    } else {
      dbConn.query(assetQuery.deleteAsset, [id], function (err, res) {
        if (err) {
          console.log("Error", err);
          result(err, null);
        } else {
          result(null, res);
        }
      });
    }
  });
};
module.exports = Asset;
