import { object, string, TypeOf } from "zod";

export type createUserRequest = TypeOf<typeof createUserSchema>;

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Password must be at least 8 characters in length."
    ),
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
  }),
});

export type loginUserRequest = TypeOf<typeof loginUserSchema>;

export const loginUserSchema = object({
  body: object({
    password: string({ required_error: "Password is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
  }),
});
