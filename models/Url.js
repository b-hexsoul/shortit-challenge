const mongoose = require("mongoose");

const { Schema } = mongoose;

const urlSchema = new Schema({
  url_long: String,
  url_short: {
    type: String,
    validate: {
      validator: (url_short) => Url.doesNotExist({ url_short }),
      message: "Shorten URL already exists",
    },
  },
  count: Number,
});

urlSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
