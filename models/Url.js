const mongoose = require("mongoose");

const { Schema } = mongoose;

const urlSchema = new Schema({
  url_code: {
    type: String,
    validate: {
      validator: (url_code) => Url.doesNotExist({ url_code }),
      message: "Shorten URL already exists",
    },
  },
  url_long: String,
  url_short: String,
  count: Number,
});

urlSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
