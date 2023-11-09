import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import catchAsync from "../utility/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (tokenData) => {
  console.log(tokenData);
  return jwt.sign({ ...tokenData }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken({
    id: user._id,
    name: user.name,
    channelName: user.channelName,
    profileImg: user.profileImg,
    country: user.country,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "None",
    httpOnly: true,
  };
  console.log("when deploying this app set cookieeoptions.secure == true");

  // cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Checking if email and password are not undefined
  if (!email || !password)
    return next(new AppError(`Provide both, email and password`, 400));

  // 2) Check if email && password are correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  // 3) If everything is okay then send json token to client
  user.password = null;
  createAndSendToken(user, 200, res);
});

export const logOut = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204).json({});

  res.clearCookie("jwt", { sameSite: "None", httpOnly: true });

  res.status(200).json({
    status: "success",
    message: "Cookies cleared",
  });
};

export const protect = catchAsync(async (req, res, next) => {
  let token = "";
  //1) Get the token, check if it exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    console.log(token);
    return next(new AppError("Login first to get access", 401));
  }

  // //2) Verification of the token

  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.log(decodedPayload);
  const user = await User.findById(decodedPayload.id);
  if (!user) {
    return new AppError("Login again ! Your session has expired", 404);
  }

  next();
});
