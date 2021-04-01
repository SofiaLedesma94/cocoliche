const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  day: String,
  customer: { type: mongoose.Schema.ObjectId, ref: 'user' },
  quantity: Number,
  info: {type: Boolean, default: false}
});

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;