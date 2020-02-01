const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  id: String,
  username: String,
  password: String
});

module.exports = mongoose.model("User", scheme);
