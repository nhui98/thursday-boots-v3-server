import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface TypedRequest extends Request {
  userId?: string | jwt.JwtPayload;
}

export default async function authenticateToken(
  req: TypedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];

  if (!token) return res.status(401);

  if (!process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).json("Secret key not found");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
    if (err || !userId) return res.status(403).json(err);

    req.userId = userId;
    next();
  });
}
