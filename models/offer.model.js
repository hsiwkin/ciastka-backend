const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  id: String,
  imageUrl: String,
  title: String,
  description: String,
  extendedDescription: String,
  updatedAt: String,
  xloc: Number,
  yloc: Number
});

module.exports = mongoose.model("Offer", scheme);
