const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Username is required"],
    },
    description: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
      required: [true, "Username is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Username is required"],
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
