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
const {
  create,
  getEvent,
  deleteEvent,
  update,
} = require("../controller/function");

router.post("/create", upload.single("image"), (req, res) => [
  create(req, res),
]);
router.get("/get", (req, res) => [getEvent(req, res)]);
router.put("/update/:id", upload.single('image'), (req, res) => [
  update(req, res),
]);
router.delete("/delete/:id", (req, res) => [deleteEvent(req, res)]);

module.exports = router;
