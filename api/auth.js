const router = require("express").Router();
const { login, signUp } = require("../controller/auth");

router.post("/login", (req, res) => [login(req, res)]);
router.post("/signUp", (req, res) => [signUp(req, res)]);

module.exports = router;
