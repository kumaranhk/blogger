import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userController = {

    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await userModel.create({ name, email, password: hashedPassword });
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error creating user" });
        }
    },

    validateUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
            const userData = await userModel.findOne({ email }, { __v: 0, password: 0 });
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Logged in successfully", user: userData, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
