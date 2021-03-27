const validUrl = require("valid-url");
const { isHttpUri, isHttpsUri } = validUrl;

const isValidUrl = (req, res, next) => {
  // Construct full URL
  const uri = req.protocol + req.get("host") + req.originalUrl;

  // Check if it is a valid URL
  if (isHttpUri(uri) || isHttpsUri(uri)) {
    next();
  }
  res.status(400).json({ error: "Not a valid Url" });
};

module.exports = isValidUrl;
