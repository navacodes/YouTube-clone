import mongoose from "mongoose";

const youtuberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videos:[String]
  },
  { timestamps: true }
);

const Youtuber = mongoose.model("Youtuber", youtuberSchema);

export default Youtuber;
