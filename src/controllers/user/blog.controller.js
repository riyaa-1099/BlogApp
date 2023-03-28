const BlogDao = require("../../dao/blog.dao");
const validateBlog = require("../validators/validateContent");

exports.getAllBlogs = async (req, res) => {
  const Blogs = await BlogDao.getAllBlogs();
  res.send({ "All Blogs": Blogs, status: "success" });
};

exports.createBlog = async (req, res) => {
  const payload = req.body;
  let value = validateBlog(payload.title, payload.content);

  if (value === true) {
    try {
      await BlogDao.createBlog(payload);
      res.send({ msg: "Blog Created successfully" });
    } catch (err) {
      console.log(err);
      res.send({ msg: "something wrong!!" });
    }
  } else {
    res.send({ msg: "Fill BLog properly!!" });
  }
};

exports.updateBlog = async (req, res) => {
  const blogID = req.params.blogID;
  const payload = req.body;
  const userID = req.body.userID;
  try {
    await BlogDao.updateBlog(blogID, payload, userID);
    res.send({ msg: "Blog updated successfully!!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Not authorised!!" });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogID = req.params.blogID;
  const userID = req.body.userID;
  try {
    await BlogDao.deleteBlog(blogID, userID);
    res.send({ msg: "Blog deleted successfully!!", status: "success" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Not authorized!!", status: "fail" });
  }
};
