const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  customer: { type: mongoose.Schema.ObjectId, ref: 'user' },
  cart: Object,
  state: { type: String, default: "sin confirmar" }
});

const Order = mongoose.model("order", productSchema);

module.exports = Order;
