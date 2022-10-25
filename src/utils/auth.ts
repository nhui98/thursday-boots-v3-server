import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const createJwtToken = (id: Types.ObjectId) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error("No JWT Secret Available");

  const token = jwt.sign({ id }, ACCESS_TOKEN_SECRET);

  return token;
};

export const createRefreshToken = (id: Types.ObjectId) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error("No JWT Secret Available");

  const token = jwt.sign({ id }, ACCESS_TOKEN_SECRET);

  return token;
};

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw new Error("Issue with hashing password");
  }
};
