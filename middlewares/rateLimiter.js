/* eslint-disable import/no-extraneous-dependencies */
const rateLimit = require("express-rate-limit");

module.exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});
