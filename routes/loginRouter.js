const express = require("express");
const jwt = require("jsonwebtoken");
const loginRouterController = require("./controllers/loginRouter.controller");

const router = express.Router();

router
  .route("/")
  .post(loginRouterController.checkUserOrCreate, (req, res, next) => {
    const token = jwt.sign(
      { userEmail: req.body.userEmail },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("token", token, { httpOnly: true });
    res.cookie("userEmail", req.body.userEmail);

    res.json({ result: "ok", userEmail: req.body.userEmail });
  });

module.exports = router;
