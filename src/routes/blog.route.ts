const express = require("express");
const blogRouter = express.Router();

import BlogController from "../controllers/blog.controller";

let blogs = new BlogController();
//--------------------------------------------------Getting all blogs

blogRouter.get("/", blogs.getAllBlogs);

blogRouter.post("/", blogs.createBlog);

blogRouter.put("/:blogID", blogs.updateBlog);

blogRouter.delete("/:blogID", blogs.deleteBlog);

export default blogRouter;
