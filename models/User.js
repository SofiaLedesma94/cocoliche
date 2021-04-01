const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  urlPic: {
    type: String,
    default:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  },
  role: { type: String, default: "user" },
  purchases: Object,
  date: { type: Date, default: Date.now },
  logginGoogle: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
