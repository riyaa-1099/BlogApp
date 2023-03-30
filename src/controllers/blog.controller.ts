import { Request, Response } from "express";
import BlogServices from "../dao/blog.dao";
import BlogValidator from "./validators/validateContent";

const blogValidator = new BlogValidator();
const blogservices = new BlogServices();


class BlogController {
public getAllBlogs = async (req: Request, res: Response): Promise<void> => {
try {
const blogs = await blogservices.getAllBlogs();
res.send({ "All Blogs": blogs, status: "success" });
} catch (err) {
console.log(err);
res.send({ msg: "Something went wrong!!" });
}
};

public createBlog = async (req: Request, res: Response): Promise<void> => {
const payload = req.body;
const { title, content } = payload;


const validationResult = blogValidator.validateBlog(title, content);

if (validationResult !== true) {
  res.send({ msg: "Fill Blog properly!!" });
  return;
}

try {
  await blogservices.createBlog(payload);
  res.send({ msg: "Blog Created successfully" });
} catch (err) {
  console.log(err);
  res.send({ msg: "Something went wrong!!" });
}
};

public updateBlog = async (req: Request, res: Response): Promise<void> => {
const blogID = req.params.blogID;
const payload = req.body;
const userID = req.body.userID;


try {
  let result=await blogservices.updateBlog(blogID, payload, userID);
  if(result===true){
  res.send({ msg: "Blog updated successfully!!" });
  }
  else{
 res.send({ msg: "Not Authorized!!" });
  }
}
 catch (err) {
  console.log(err);
  res.send({ msg: "Not authorized!!" });
}
};

public deleteBlog = async (req: Request, res: Response): Promise<void> => {
const blogID = req.params.blogID;
const userID = req.body.userID;


try {
  await blogservices.deleteBlog(blogID, userID);
  res.send({ msg: "Blog deleted successfully!!", status: "success" });
} catch (err) {
  console.log(err);
  res.send({ msg: "Not authorized!!", status: "fail" });
}
};
}

export default BlogController;