import express from "express";
import dotenv from "dotenv";
import * as videosController from "../controllers/videosController.js";
import * as authController from "../controllers/authController.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/upload").post(authController.protect, upload.single("video"), videosController.postMyVideoOnCloudinary);
router.route("/publish").post(authController.protect, upload.none(), videosController.publishMyVideo);
router.route("/permanent-delete").post(authController.protect, upload.none(), videosController.permanentDeleteMyVideo);

export default router;
