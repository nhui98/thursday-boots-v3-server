import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export default function validateRequest(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof Error) return res.status(400).send(e.message);
    }
  };
}
