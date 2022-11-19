const express = require("express");

const presetRouterController = require("./controllers/presetRouter.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(verifyToken, presetRouterController.getPresets)
  .post(verifyToken, presetRouterController.createPreset);

router
  .route("/:presetId")
  .put(verifyToken, presetRouterController.updatePreset)
  .delete(verifyToken, presetRouterController.deletePreset);

module.exports = router;
