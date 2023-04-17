const Asset = require("./../model/assetsModel");

/********************************* Add assets ********************************************************************************/

exports.craeteAsset = (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    newAsset.delete_flag = "0";
    Asset.create(newAsset, (err, asset) => {
      if (asset != null) {
        res.status(201).json({
          statusCode: 201,
          status: "sucess",
          message: "Asset added successfully",
          data: newAsset,
        });
      } else if (err.errno == 1062) {
        console.log(err);
        res.json({
          statusCode: 403,
          status: "failed",
          message: "Duplicate entry",
        });
      } else if (err.code === "ER_BAD_NULL_ERROR") {
        console.log(err);
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
    });
  } catch (err) {
    console.log(err);
  }
};
/********************************** Get All Assets ***************************************************************************************************/

exports.getAllAssets = (req, res) => {
  try {
    Asset.getAllAssets((err, assets) => {
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
          result: assets.length,
          data: assets,
        });
      }
    });
  } catch (err) {
    res.json({
      statusCode: 500,
      status: "failed",
      message: "something went wrong",
    });
  }
};

/*********************************** Get a P1articulat Assets ************************************************************************************** */

exports.getAsset = (req, res) => {
  try {
    const id = req.body.id * 1;
    Asset.findById(id, (err, asset) => {
      if (err) {
        res.json({
          statusCode: 400,
          status: "failed",
          message: "something went wrong",
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          status: "success",
          data: asset,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
/************************************* Update Assets By It's Id ************************************************************************************ */

exports.updateAsset = (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({
        status: "failed",
        message: "Please provide all required field",
      });
    } else {
      Asset.update(req.body.id, new Asset(req.body), function (err, asset) {
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
            message: "asset updated successfully",
          });
        }
      });
    }
  } catch (err) {
    res.json({
      statusCode: 500,
      status: "failed",
      message: "something went wrong",
    });
  }
};
/************************************* Delete Assets By It's Id ************************************************************************************ */
exports.deleteAssets = (req, res) => {
  try {
    Asset.delete(req.body.id, function (err, asset) {
      if (err) {
        console.log(err);
        res.json({
          statusCode: 400,
          status: "failed",
          message: "something went wrong",
        });
      } else {
        res.json({
          statusCode: 200,
          status: "success",
          message: "asset deleted successfully",
        });
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
