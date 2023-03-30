class BlogValidator {
  validateBlog(title: string, content: string): boolean {
    if (!title || !content) {
      return false;
    }
    return true;
  }
}

export default BlogValidator;
