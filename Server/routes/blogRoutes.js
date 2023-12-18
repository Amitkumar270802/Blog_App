const express = require("express");
const {
  getAllBlogsController,
  createBlogsController,
  getBlogByIdController,
  deleteBlogByIdController,
  updateBlogController,
  userBlogController,
} = require("../controllers/BlogController");

const router = express.Router();

// get
router.get("/all-blog", getAllBlogsController);

// Post
router.post("/create-blog", createBlogsController);

// Put
router.put("/update-blog/:id", updateBlogController);

// Get || Single
router.get("/get-blog/:id", getBlogByIdController);

// Delete
router.delete("/delete-blog/:id", deleteBlogByIdController);


// Get || Single
router.get("/user-blog/:id", userBlogController);

module.exports = router;
