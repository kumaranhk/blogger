import express from "express";
import { blogController } from "../controllers/blog.controller.js";

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/', blogController.createBlog);
blogRouter.put('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);
blogRouter.get('/my-blogs', blogController.getMyBlogs);
blogRouter.get('/authors',blogController.getAuhtors);
blogRouter.get('/categories',blogController.getCategory);
blogRouter.get('/:id', blogController.getBlogById);

export default blogRouter;