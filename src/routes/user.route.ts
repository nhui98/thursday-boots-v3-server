import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const userRouter = express.Router();

userRouter.post("/register", validateRequest(createUserSchema), createUser);
userRouter.post("/login", validateRequest(loginUserSchema), loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
