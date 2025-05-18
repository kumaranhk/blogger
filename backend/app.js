import express from "express";
import { mongooseConnect } from "./configs/db-config.js";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.routes.js";
import { auth } from "./middlewares/auth.js";

const app = express();
app.use(express.json());
mongooseConnect();
app.use(cors());
app.use(logger);

app.use('/auth',userRouter);
app.use('/blogs',auth ,blogRouter);

export default app;