const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  form: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  income: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Event", eventSchema);
