const express = require("express");
const blogRouter = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/user/blog.controller");

//--------------------------------------------------Getting all blogs

blogRouter.get("/", getAllBlogs);

blogRouter.post("/post", createBlog);

blogRouter.put("/put/:blogID", updateBlog);

blogRouter.delete("/delete/:blogID", deleteBlog);

module.exports = blogRouter;
