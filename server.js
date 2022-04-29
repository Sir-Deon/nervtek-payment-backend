const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const { v4: uuidv4 } = require("uuid");

// Created Express Object
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  // setting up cors
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

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

io.on("connection", async socket => {
  console.log("New participant connected");
  socket.on("joinRoom", roomName => {
    socket.join(roomName);
  });
});

let status = null;
app.get("/callback", (req, res) => {
  status = req.query.status;
  console.log(req.query);
  io.on("paying", room => {
    if (status === "SUCCESS") {
      io.to(room).emit("paid", status);
    }
  });
});

http.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
