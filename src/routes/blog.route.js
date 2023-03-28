const express = require("express");
const blogRouter = express.Router();

const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/user/blog.controller");

//--------------------------------------------------Getting all blogs

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.send({ "All Blogs": blogs, status: "success" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong!!", status: "fail" });
  }
});

blogRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    const new_blog = await createBlog(payload);
    res.send({ msg: "Blog Created successfully", status: "success", blog: new_blog });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something wrong!!", status: "fail" });
  }
});

//--------------------------------------------------updating route

blogRouter.put("/patch/:blogID", async (req, res) => {
  const blogID = req.params.blogID;
  const payload = req.body;
  const userID = req.body.userID;
  try {
    const blog = await updateBlog(blogID, userID, payload);
    if (blog) {
      res.send({ msg: "Blog updated successfully!!", status: "success" });
    } else {
      res.send({ msg: "Not authorized!!", status: "fail" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong!!", status: "fail" });
  }
});

//--------------------------------------------------Deleting route

blogRouter.delete("/delete/:blogID", async (req, res) => {
  const blogID = req.params.blogID;
  const userID = req.body.userID;
  try {
    const result = await deleteBlog(blogID, userID);
    if (result.deletedCount > 0) {
      res.send({ msg: "Blog deleted successfully!!", status: "success" });
    } else {
      res.send({ msg: "Not authorized!!", status: "fail" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong!!", status: "fail" });
  }
});

module.exports = blogRouter;