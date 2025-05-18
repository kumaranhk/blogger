import express from 'express';
import { userController } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.validateUser);

export default userRouter;