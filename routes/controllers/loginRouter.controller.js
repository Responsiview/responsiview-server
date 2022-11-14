const User = require("../../models/User");

exports.checkUserOrCreate = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail });

    if (!user) {
      await User.create({
        email: req.body.userEmail,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
