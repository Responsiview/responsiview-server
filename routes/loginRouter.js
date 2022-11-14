const express = require("express");
const jwt = require("jsonwebtoken");
const statusCodes = require("http-status-codes");

const loginRouterController = require("./controllers/loginRouter.controller");

const router = express.Router();

router
  .route("/")
  .post(loginRouterController.checkUserOrCreate, (req, res, next) => {
    const token = jwt.sign(
      { email: req.body.user.email },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("token", token, { httpOnly: true });

    res.json({ result: "ok", user: req.body.user });
  });

router.route("/authenticate").get(async (req, res, next) => {
  const clientToken = req.cookies.token;

  try {
    await jwt.verify(clientToken, process.env.JWT_SECRET_KEY);

    res.status(200).json({ result: "ok" });
  } catch (error) {
    res.status(statusCodes.UNAUTHORIZED).json({ error: "unauthorized" });
  }
});

module.exports = router;
