const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // set the destination folder for the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // set a unique file name for the uploaded files
  },
});
exports.upload = multer({ storage: storage }).fields([
  { name: "ga_quali_doc_name", maxCount: 3 },
  { name: "po_quali_doc_name", maxCount: 3 },
  { name: "hi_quali_doc_name", maxCount: 3 },
  { name: "in_quali_doc_name", maxCount: 3 },
  { name: "pan_file_name", maxCount: 1 },
  { name: "adhar_file_name", maxCount: 1 },
  { name: "passport_file_name", maxCount: 1 },
  { name: "dl_voter_id_file", maxCount: 1 },
]);

exports.uploadLeaveattcheFile = multer({ storage: storage }).fields([
  { name: "attached_file", maxCount: 3 },
]);
