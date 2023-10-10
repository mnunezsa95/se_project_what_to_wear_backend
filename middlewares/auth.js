const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleAuthError } = require("../utils/handleErrors");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError();
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }
  req.user = payload;
  return next();
};
