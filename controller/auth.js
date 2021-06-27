const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv/config");

const login = async (req, res) => {
  // Check if email exists

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin)
    return res.json({
      success: false,
      msg: "E-mail does not exist!!",
    });
  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass)
    return res.json({
      success: false,
      msg: "Invalid Password!!",
    });

  // Create and assign a token
  const payload = {
    _id: admin._id,
    email: admin.email,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: 604800,
    },
    (err, token) => {
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  );
};

const signUp = async (req, res) => {
  //  // Check if email exists
  const emailExist = await Admin.findOne({ email: req.body.email });
  if (emailExist)
    return res.json({
      success: false,
      msg: "User with this email already exists!!",
    });

  const { email, password } = req.body;
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPasswords = await bcrypt.hash(password, salt);

  const admin = new Admin({
    email: email,
    password: hashedPasswords,
  });
  await admin
    .save()
    .then((res) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
      return;
    });
};

module.exports = {
  login,
  signUp,
};
