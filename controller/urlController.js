const Url = require("../models/Url.js");
const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 6);

// @desc    Shorten Url - Url is recieved from req.body.url;
// @route   POST /api/v1/shortenUrl
// @access  Public
exports.shortenUrl = async (req, res, next) => {
  // Check if Long URL exists, if it does then increases the count and will return data.
  const urls = await Url.findOneAndUpdate(
    { url_long: req.body.url },
    { $inc: { count: 1 } },
    { returnOriginal: false }
  );

  // if url, send success data
  if (urls) {
    // Return to client
    return res.status(200).json({
      original: urls.url_long,
      short: urls.url_short,
      count: urls.count,
    });
  } else {
    // Create a shortened path
    // with 6 chars, ~1 day needed, in order to have a 1% probability of at least one collision. re: nanoid Calculator
    let url_code = nanoid();
    let url_long = req.body.url;
    // Remove any path from original
    let host = url_long.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    let url_short = host[1] + "/" + url_code;

    try {
      // Create new document
      const urls = await Url.create({
        url_code,
        url_long,
        url_short,
        count: 0,
      });

      // Return to client
      return res.status(200).json({
        original: urls.url_long,
        short: urls.url_short,
        count: urls.count,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Please try again",
      });
    }
  }
};
