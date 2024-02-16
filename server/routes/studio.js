import express from "express";
import * as authController from "../controllers/authController.js";
import * as studioController from "../controllers/studioController.js";

const router = express.Router();

router.route("/:userID/videos").get(authController.protect, studioController.getMyVideos);
router.route("/:userID/shorts").get(authController.protect, studioController.getMySlimVideos);
export default router;
