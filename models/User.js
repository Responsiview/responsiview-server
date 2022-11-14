const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  presetCreates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preset",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
