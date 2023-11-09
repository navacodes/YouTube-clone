import express from "express";
import * as viewsController from "../controllers/viewsController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/channels")
  .get(authController.protect, viewsController.getChannels);
router.get("/videos", viewsController.getAllVideos);

export default router;
