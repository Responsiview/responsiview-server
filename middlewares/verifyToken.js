const jwt = require("jsonwebtoken");
const statusCodes = require("http-status-codes");

async function verifyToken(req, res, next) {
  const clientToken = req.cookies.token;

  try {
    await jwt.verify(clientToken, process.env.JWT_SECRET_KEY);

    next();
  } catch (error) {
    error.status = statusCodes.UNAUTHORIZED;
    error.message = "unauthorized";

    next(error);
  }
}

module.exports = verifyToken;
