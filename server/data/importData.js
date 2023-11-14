import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import cloudinary from "cloudinary";

import {
  youtubers,
  youtubersCloud,
  users,
  videos,
  videosCloud,
} from "./data.js";
import User from "../models/User.js";
import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// IMPORT images into cloudinary and creating new data with cloudinary URLs
// const youtubersData = [];
// const vidsData = [];
const shortsData = [];
const importCloudinary = async () => {
  try {
    let i = 1;
    // for (const { key, name, imgUrl } of youtubers) {
    //   const result = await cloudinary.v2.uploader.upload(imgUrl);
    //   const newData = {
    //     key,
    //     name,
    //     imgUrl: result.secure_url,
    //   };

    //   youtubersData.push(newData);
    //   console.log(i++);
    // }
    // if (i === 201) {
    //   console.log(youtubersData);
    //   const jsonstring = JSON.stringify(youtubersData);
    //   fs.writeFileSync("./data/youtubersData.js", jsonstring);
    // }
    for (const { shortUrl, ...restData } of shorts) {
      const result = await cloudinary.v2.uploader.upload(shortUrl, {
        resource_type: "video",
      });
      const newData = {
        ...restData,
        shortUrl: result.secure_url,
      };
      shortsData.push(newData);
      console.log(i++);
    }
    if (i === 25) {
      console.log(shortsData);
      const jsonstring = JSON.stringify(shortsData);
      fs.writeFileSync("./data/fsWriteFiles/shortsData.js", jsonstring);
    }
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// const addChannelName = () => {
//   let newUsers = [];
//   users.map(({ name, ...restData }) => {
//     let UID = "";
//     name.split(" ").forEach((el) => {
//       UID += el[0];
//     });
//     UID += Math.floor(Math.random() * 100);
//     const newData = {
//       name,
//       ...restData,
//       channelName: UID,
//     };
//     newUsers.push(newData);
//   });

//   const jsonstring = JSON.stringify(newUsers);
//   fs.writeFileSync("./data/fsWriteFiles/userswithChannelName.js", jsonstring);
// };
// addChannelName();

const DB = process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASS);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected successfully`));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await User.create(users);
    await Video.create(videosCloud);
    // await Youtuber.create(youtubersCloud);
    console.log(`Data successfully loaded`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//  DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await User.deleteMany();
    // await Youtuber.deleteMany();
    await Video.deleteMany();
    console.log(`Data deleted succesfully`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--importCloud") {
  importCloudinary();
}

if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteData();
}

// const youtubersData = youtubersCloud;
// const fillVideoUrls = async () => {
//   try {
//     const Videos = await Video.find();

//     for (const youtuber of youtubersData) {
//       for (const video of Videos) {
//         if (youtuber._id == video.createdBy) {
//           youtuber.videos.push(video._id);
//           console.log(youtuber);
//         }

//       }
//     }
//     const jsonstring = JSON.stringify(youtubersData);
//     fs.writeFileSync("./data/fsWriteFiles/newYoutubersVideoData.js", jsonstring);
//   } catch (error) {
//     console.log(error);
//   }
//   process.exit();
// };
// fillVideoUrls();
