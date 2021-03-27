const express = require("express");
const router = express.Router();
const isValidUrl = require("../middleware/isValidUrl");
const { shortenUrl } = require("../controller/urlController");

// Root path of /api/v1/shortenUrl
router.route("/").post(isValidUrl, shortenUrl);

module.exports = router;
