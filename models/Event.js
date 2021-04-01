const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  title: String,
  picture: String,
  description: String,
  categoty: String,
  dateEvent: String
});


const Event = mongoose.model("event", eventSchema);

module.exports = Event;
