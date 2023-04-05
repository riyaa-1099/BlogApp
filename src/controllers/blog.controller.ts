import { Request, Response } from "express";
import BlogServices from "../dao/blog.dao";
import BlogValidator from "./validators/validateContent";

const blogValidator = new BlogValidator();
const blogservices = new BlogServices();


class BlogController {
  public getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page, limit } = req.query;
      const blogsResult = await blogservices.getAllBlogs(Number(page), Number(limit));
      const userID = req.body.userID;
      res.send({
        "All_Blogs": blogsResult.blogs,
        "userID": userID,
        "total": blogsResult.count,
        "currentPage": page,
        "perPage": limit,
        "status": "success",
      });
    } catch (err) {
      console.log(err);
      res.send({ msg: "Something went wrong!!" });
    }
  };


public createBlog = async (req: Request, res: Response): Promise<void> => {

  let payload = req.body;
  let { title, content, image } = payload;

  const validationResult = blogValidator.validateBlog(title, content, image);

  if (validationResult !== true) {
    res.send({ msg: "Fill Blog properly!!" });
    return;
  }

  if (!image) {
    const defaultImage = { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQye05xDFTVZsZDrIzgMD24CL-dBfaEaYvQBordhXjMEQ&usqp=CAU&ec=4866569" };
    payload = { ...payload, ...defaultImage };
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
  res.send({ msg: "something wrong!!" });
}
};

public deleteBlog = async (req: Request, res: Response): Promise<void> => {

const blogID = req.params.blogID;
const userID = req.body.userID;


try {
  let result=await blogservices.deleteBlog(blogID, userID);
if(result===true){
  res.send({ msg: "Blog deleted successfully!!", status: "success" });
}
else{
  res.send({ msg: "Not Authorized!!", status: "fail" });
}
} 
catch (err) {
  console.log(err);
  res.send({ msg: "something wrong", status: "fail" });
}
};
}

export default BlogController;