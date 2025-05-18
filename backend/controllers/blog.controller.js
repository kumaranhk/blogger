import blogModel from "../models/blog.model.js";
import userModel from "../models/user.model.js";

export const blogController = {

    createBlog: async (req, res) => {
        const { title, content, category, image } = req.body;
        const { _id } = req.user;
        try {
            const user = await userModel.findOne({ _id });
            await blogModel.create({ title, content, category, author: user.name, userId: _id, image });
            res.status(201).json({ message: "Blog created successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error creating blog", error: error.message });
        }
    },

    getAllBlogs: async (req, res) => {
        const { category, author } = req.query;
        try {
            const filter = {};
            if (category) filter.category = category;
            if (author) filter.author = author;
            const blogs = await blogModel.find(filter);
            res.json(blogs);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getMyBlogs: async (req, res) => {
        const { _id } = req.user;
        try {
            const blogs = await blogModel.find({ userId: _id });
            res.json(blogs);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getBlogById: async (req, res) => {
        const { id } = req.params;
        const { _id } = req.user;
        try {
            const blog = await blogModel.findOne({ userId: _id, _id: id });
            res.json(blog);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateBlog: async (req, res) => {
        const { id } = req.params;
        const { title, content, image } = req.body;
        const { _id } = req.user;
        if (!id) {
            return res.status(400).json({ message: "Blog ID is required" });
        }
        try {
            const blog = await blogModel.findOne({ _id: id, userId: _id });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            await blogModel.updateOne({ _id: id }, { $set: { title, content, image } });
            res.status(200).json({ message: "Blog updated successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error updating blog", error: error.message });
        }
    },

    deleteBlog: async (req, res) => {
        const { id } = req.params;
        const { _id } = req.user;
        if (!id) {
            return res.status(400).json({ message: "Blog ID is required" });
        }
        try {
            const blog = await blogModel.findOne({ _id: id, userId: _id });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            await blogModel.deleteOne({ _id: id });
            res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error deleting blog", error: error.message });
        }
    },

    getCategory: async (req, res) => {
        try {
            const categories = await blogModel.find({}, { category: 1,_id : 0 });
            const strCategories = categories.map(val => val.category);
            res.json([... new Set(strCategories)]);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAuhtors: async (req, res) => {
        try {
            const authors = await blogModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: 'userId',
                        foreignField: "_id",
                        as: 'userDetails'
                    }
                }, {
                    $unwind: "$userDetails"
                },
                {
                    $group: {
                        _id: "$userDetails._id",
                        authorName: { $first: "$userDetails.name" },
                        authorId: { $first: "$userDetails._id" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        authorName: 1,
                        // authorId: 0
                    }
                }
            ]);
            const strAuthors = authors.map(val => val.authorName);
            res.json([... new Set(strAuthors)]);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Interal server error" });
        }
    }
}