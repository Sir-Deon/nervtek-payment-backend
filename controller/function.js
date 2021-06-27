const Event = require("../models/event");
require("dotenv/config");

// const baseUrl = "http://localhost:5000/";
const baseUrl = process.env.PROD_BACKEND;

const create = async (req, res) => {
  const { name, form, cost } = req.body;
  const prefiix = "https://docs.google.com/forms/d/e/";
  const formCode = form.split("/")[6];
  const suffix = "/viewform?embedded=true";
  const pic = "";
  try {
    if (req.file.filename) {
      pic = baseUrl + "images/" + req.file.filename;
    }
  } catch (error) {}

  const event = new Event({
    name: name,
    form: prefiix + formCode + suffix,
    cost: cost,
    image: pic,
  });

  await event
    .save()
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Something went wrong !!",
      });
      console.log(err);
    });
};
const getEvent = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  await Event.findOneAndDelete({ _id: id })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Something went wrong !!",
      });
      console.log(err);
    });
};
const update = async (req, res) => {
  const { name, cost, form, state } = req.body;
  const id = req.params.id;
  const prefiix = "https://docs.google.com/forms/d/e/";
  const formCode = form.split("/")[6];
  const suffix = "/viewform?embedded=true";
  let pic = "";
  try {
    if (req.file.filename) {
      pic = baseUrl + "images/" + req.file.filename;
    }
  } catch (error) {}
  try {
    if (req.file.filename) {
      await Event.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            form: prefiix + formCode + suffix,
            cost: cost,
            image: pic,
            state: state,
          },
        }
      )
        .then(() => {
          res.json({
            success: true,
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            msg: "Something went wrong!!",
          });
          console.log(err);
        });
      return;
    }
  } catch (error) {}

  await Event.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        form: code,
        cost: cost,
        state: state,
      },
    }
  )
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Something went wrong!!",
      });
      console.log(err);
    });
};
module.exports = {
  create,
  getEvent,
  deleteEvent,
  update,
};
