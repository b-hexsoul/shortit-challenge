const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.listen(() => {
  console.log(`Server runnning on port ${PORT}`);
});
