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
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
