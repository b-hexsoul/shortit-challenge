const validUrl = require("valid-url");
const { isHttpUri, isHttpsUri } = validUrl;

const isValidUrl = (req, res, next) => {
  let uri = req.body.url;

  // If uri not include in req.body then error
  if (!uri) return res.status(400).json({ error: "Need a URL" });

  // Check if it is a valid URL
  if (isHttpUri(uri) || isHttpsUri(uri)) {
    return next();
  }

  // if not valid url then error
  return res.status(400).json({ error: "Not a valid URL" });
};

module.exports = isValidUrl;
