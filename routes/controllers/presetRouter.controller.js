const { startSession } = require("mongoose");

const User = require("../../models/User");
const Preset = require("../../models/Preset");

exports.getPresets = async (req, res, next) => {
  try {
    const user = await User.findOne({
      userEmail: req.params.userEmail,
    })
      .populate("presetCreates")
      .lean();
    const presets = user.presetCreates;

    res.send(presets);
  } catch (error) {
    error.message = "Database 에러발생";

    next(error);
  }
};

exports.createPreset = async (req, res, next) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({
      userEmail: req.params.userEmail,
    }).session(session);

    const createdPreset = await Preset.create(
      [
        {
          userId: user._id,
          title: req.body.presetTitle,
          url: req.body.url,
          deviceIdList: req.body.deviceIdList,
        },
      ],
      { session },
    );

    user.presetCreates.push(createdPreset[0]._id);
    await user.save();

    await session.commitTransaction();
    session.endSession();

    res.send({ result: "Success", createdPreset: createdPreset[0] });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    error.message = "Database 에러발생";

    next(error);
  }
};

exports.updatePreset = async (req, res, next) => {
  try {
    const preset = await Preset.findById(req.params.presetId);

    preset.url = req.body.url;
    preset.deviceIdList = req.body.deviceIdList;

    const updatedPreset = await preset.save();

    res.send({ result: "Success", updatedPreset });
  } catch (error) {
    error.message = "Database 에러발생";

    next(error);
  }
};

exports.deletePreset = async (req, res, next) => {
  const session = await startSession();

  try {
    session.startTransaction();

    await Preset.findByIdAndDelete(req.params.presetId, { session });

    const user = await User.findOne({
      userEmail: req.params.userEmail,
    }).session(session);

    user.presetCreates.splice(
      user.presetCreates.indexOf(req.params.presetId),
      1,
    );

    await user.save();

    await session.commitTransaction();
    session.endSession();

    res.send({ result: "Success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    error.message = "Database 에러발생";

    next(error);
  }
};
