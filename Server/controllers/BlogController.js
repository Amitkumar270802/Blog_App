const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "No Blogs Found",
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.createBlogsController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image) {
      return res.status(500).send({
        success: false,
        message: "All Fields are Required",
      });
    }
    console.log(req.body);
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(500).send({
        success: false,
        message: "Unable to find User",
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      image: image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Create",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Found",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error in finding Blog",
    });
  }
};

exports.deleteBlogByIdController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in Deleting Blog",
      error,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(400).send({
        success: false,
        message: "Blogs not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs found",
      userBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in Fetching Blog",
      error,
    });
  }
};
