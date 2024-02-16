import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import videosRoutes from "./routes/videos.js";
import studioRoutes from "./routes/studio.js";
import usersRoutes from "./routes/user.js";
import viewRoutes from "./routes/views.js";

import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utility/AppError.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://youtube-clone-tlmx.onrender.com",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(mongoSanitize());

app.use((req, res, next) => {
  req.requireTime = new Date().toISOString();
  console.log(req.requireTime);
  next();
});

// ROUTES
app.use("/api/v1/view", viewRoutes);
app.use("/api/v1/videos", videosRoutes);
app.use("/api/v1/studio", studioRoutes);
app.use("/api/v1/user", usersRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

//MongoDB

const { PORT } = process.env || 5002;
const mongoURL = process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASS);

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`DB connected`);
    app.listen(PORT, () => console.log(`Server running at:`, PORT));
  })
  .catch((error) => console.log(`${error}, DB did not connect`));
