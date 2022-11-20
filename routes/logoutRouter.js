const express = require("express");

const router = express.Router();

router.route("/").post((req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("userEmail");

    res.json({ result: "Success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
