import { BlogModel, IBlog } from "../models/blog.model";

class BlogService {
  public getAllBlogs = async (page: number, limit: number): Promise<{ blogs: IBlog[]; count: number }> => {
    const skip = (page - 1) * limit;
    const blogs = await BlogModel.find().skip(skip).limit(limit);
    const count = await BlogModel.countDocuments();
    return { blogs, count };
  };


public createBlog = async (payload: IBlog): Promise<void> => {
const newBlog = new BlogModel(payload);
await newBlog.save();
}

public updateBlog = async (blogID: string, payload: IBlog, userID: string): Promise<boolean> => {
const blog = await BlogModel.findOne({ _id: blogID });


if (!blog) {
  return false;
}

if (String(userID) !== String(blog.userID)) {
  return false;
}

let updateblog=await BlogModel.findByIdAndUpdate(blogID, payload);
if(updateblog===null){
  return false;
}
else{
  return true;
}

}

public deleteBlog = async (blogID: string, userID: string): Promise<boolean> => {
const blog = await BlogModel.findOne({ _id: blogID });

if (!blog) {
  return false;
}

if (String(userID) !== String(blog.userID)) {
  return false;
}

await BlogModel.findByIdAndDelete(blogID);
return true;
}
}

export default BlogService;