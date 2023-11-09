import express from "express";
import * as authController from "../controllers/authController.js";
import * as studioController from "../controllers/studioController.js";

const router = express.Router();

router.route("/:userID").get(authController.protect, studioController.getMyVideos);
export default router;
