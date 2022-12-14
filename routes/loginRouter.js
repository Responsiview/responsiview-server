const express = require("express");
const jwt = require("jsonwebtoken");

const loginRouterController = require("./controllers/loginRouter.controller");

const router = express.Router();

router
  .route("/")
  .post(loginRouterController.checkUserOrCreate, (req, res, next) => {
    try {
      const token = jwt.sign(
        { userEmail: req.body.userEmail },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );

      res.json({
        result: "Success",
        userEmail: req.body.userEmail,
        token,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
