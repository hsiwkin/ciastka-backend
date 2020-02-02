const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  id: String,
  sellerId: String,
  buyerId: String,
  offerId: String
});

module.exports = mongoose.model("Invoice", scheme);
