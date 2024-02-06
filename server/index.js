const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");
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
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(mongoSanitize());

app.use((req, res, next) => {
  req.requireTime = new Date().toISOString();
  console.log(req.cookies);
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
