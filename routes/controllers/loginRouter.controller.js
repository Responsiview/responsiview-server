const User = require("../../models/User");

exports.checkUserOrCreate = async (req, _, next) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail });

    if (!user) {
      await User.create({
        email: req.body.userEmail,
      });
    }

    next();
  } catch (error) {
    error.message = "Database 에러발생";

    next(error);
  }
};
