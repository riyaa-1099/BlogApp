const Blogmodel = require('../models/blog.model');

exports.getAllBlogs = async () => {
  const Blogs = await Blogmodel.find();
  return Blogs;
};

exports.createBlog = async (payload) => {
  const new_blog = new Blogmodel(payload);
  await new_blog.save();
};

exports.updateBlog = async (blogID, payload, userID) => {
  const blogm = await Blogmodel.findOne({ _id: blogID });
  if (userID !== blogm.userID) {
    throw new Error('Not authorized');
  }
  await Blogmodel.findByIdAndUpdate({ _id: blogID }, payload);
};

exports.deleteBlog = async (blogID, userID) => {
  const blog = await Blogmodel.findOne({ _id: blogID });
  if (userID == blog.userID) {
    await Blogmodel.findByIdAndDelete({ _id: blogID });
  } else if (userID !== blog.userID) {
    throw new Error('Not authorized');
  }
};
