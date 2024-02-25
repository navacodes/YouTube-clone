import express from "express";
import dotenv from "dotenv";
import * as videosController from "../controllers/videosController.js";
import * as authController from "../controllers/authController.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();
const router = express.Router();

console.log(process.env.CLOUDINARY_NAME);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "upload-route",
    allowed_formats: ["mp4", "avi", "mov"],
    resource_type: "video",
  },
});

const upload = multer({ storage });

router.route("/upload").post(authController.protect, upload.single("video"), videosController.postMyVideoOnCloduinary);
router.route("/publish").post(upload.single("video"), videosController.publishMyVideo);
export default router;
