import { Request, Response } from "express";
import User from "../models/user.model";
import { createUserRequest, loginUserRequest } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import cookie from "cookie";
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

    const token = createJwtToken(user._id);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 3600 * 1000, //ms
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
    );

    res.status(201).json({ message: "User created", user });
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

    const token = createJwtToken(user._id);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 3600 * 1000, //ms
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
    );

    res.status(200).json({ message: "Authenticated" });
  } catch (e) {
    if (e instanceof Error) res.status(401).json(e.message);
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("ACCESS_TOKEN", { path: "/" });
  res.status(200).json({ message: "Logged Out" });
}
