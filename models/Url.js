const mongoose = require("mongoose");

const { Schema } = mongoose;

const urlSchema = new Schema({
  url_long: String,
  url_short: String,
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
