const express = require("express");
const authorization = require("./../auth/verify_token");
const assetsController = require("./../controllers/assetsController");
const router = express.Router();

router
  .route("/")
  .get(
    authorization.checkToken,
    authorization.checkAdmin,
    assetsController.getAllAssets
  )
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    assetsController.getAsset
  )
  .patch(
    authorization.checkToken,
    authorization.checkAdmin,
    assetsController.updateAsset
  )
  .put(
    authorization.checkToken,
    authorization.checkAdmin,
    assetsController.deleteAssets
  );
router
  .route("/addAsset")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    assetsController.craeteAsset
  );

module.exports = router;
