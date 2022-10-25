import { Request, Response } from "express";
import User from "../models/user.model";
import { createUserRequest, loginUserRequest } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import { createJwtToken, hashPassword } from "../utils/auth";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body as createUserRequest["body"];

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email address already exists");

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const accessToken = createJwtToken(user._id);

    res.status(201).json({ accessToken });
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body as loginUserRequest["body"];

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Incorrect email or password");

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) throw new Error("Incorrect email or password");

    const accessToken = createJwtToken(user._id);
    // const refreshToken = createRefreshToken(user.id);

    res.status(200).json({ accessToken });
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("ACCESS_TOKEN", { path: "/" });
  res.status(200).json({ message: "Logged Out" });
}
