const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const { json, urlencoded } = express;
const connectDB = require("./config/db.config");

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

// Routes
const urlRouter = require("./routes/apiRoutes");

app.use("/api/v1/shortenUrl", urlRouter);

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

connectDB();
