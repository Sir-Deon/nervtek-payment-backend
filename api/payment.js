const router = require("express").Router();
const verify = require("../verifyToken");
const multer = require("multer");
const path = require("path");

// storage engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// setup upload
const upload = multer({
  storage: storage,
});

router.get("/callback", (req, res) => {
  status = req.query.status;
  console.log(req.query);
});

router.get("/checkpay", (req, res) => {
  console.log(`status: ${status}`);
  if (status == "SUCCESSFUL") {
    res.json({
      success: true,
      status: status,
    });
    status = "";
  }
});

module.exports = router;
