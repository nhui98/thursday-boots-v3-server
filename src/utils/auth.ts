import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

export const createJwtToken = (id: Types.ObjectId) => {
  if (!JWT_SECRET) throw new Error("No JWT Secret Available");

  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: 3600, //seconds
  });

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
