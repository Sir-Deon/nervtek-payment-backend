const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
//Connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

let options = {
  dotfiles: "ignore", //allow, deny, ignore
  etag: true,
  extensions: ["htm", "html"],
  index: false, //to disable directory indexing
  maxAge: "7d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    //add this header to all static responses
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("./uploads", options));

let port = process.env.PORT || 5000;
app.use(cors());

// Import API endpoints
const auth = require("./api/auth");
const func = require("./api/function");

app.get("/", (req, res) => {
  res.send("Nervtek payment backend");
});

app.use("/api/auth/", auth);
app.use("/api/admin/", func);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
