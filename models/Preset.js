const mongoose = require("mongoose");

const presetSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  deviceList: [{
    type: String,
    required: true,
  }]
});

module.exports = mongoose.model("Preset", presetSchema);
