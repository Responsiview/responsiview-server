const jwt = require("jsonwebtoken");
const statusCodes = require("http-status-codes");

async function verifyToken(req, res, next) {
  const clientToken = req.cookies.token;

  try {
    await jwt.verify(clientToken, process.env.JWT_SECRET_KEY);

    next();
  } catch (error) {
    res.clearCookie("token");
    res.clearCookie("userEmail");

    error.status = statusCodes.UNAUTHORIZED;
    error.message = "사용자 정보가 유효하지 않습니다. 다시 로그인해주세요.";

    next(error);
  }
}

module.exports = verifyToken;
