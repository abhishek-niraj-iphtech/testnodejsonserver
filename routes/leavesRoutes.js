const express = require("express");
const leavesController = require("./../controllers/leavesController");
const authorization = require("../auth/verify_token");
const router = express.Router();

router
  .route("/addLeaves")
  .post(
    authorization.checkToken,
    authorization.checkAdmin,
    leavesController.addLeave
  );
router
  .route("/allLeaves")
  .post(authorization.checkToken, leavesController.getAllLeaves);
router
  .route("/leave")
  .post(authorization.checkToken, leavesController.getLeave);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.route("/xlleave").post(upload.single("file"), leavesController.xldata);
module.exports = router;
