const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(
    "mongodb+srv://read-write-only:user-deleted-in-a-week@cluster0.bojp1.mongodb.net/url-shortener?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`Mongo DB Connected on ${connection.connection.host}`);
};

module.exports = connectDB;
