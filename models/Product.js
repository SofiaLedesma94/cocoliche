const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: [{ userId: String, value: Number }],
  reviews: [{ userId: String, title: String, text: String, date: Date, rating: Number }],
  picture: String,
  category: String,
  subcategories: [{ subcategory: String, subcategoryPrice: Number, subcategoryStock: Number }],
  delay: Number,
  amountSold: { type: Number, default: 0 }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;