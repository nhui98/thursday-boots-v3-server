import z from "zod";
import mongoose from "mongoose";

const Product = z.object({
  slug: z.string(),
  category: z.string(),
  gender: z.string(),
  style: z.string(),
  color: z.string(),
  price: z.number().nonnegative(),
  images: z.string().array().nonempty(),
  sizes: z
    .object({
      size: z.number().positive().gt(5).lt(15),
      stock: z.number().nonnegative(),
    })
    .array(),
  productFeatures: z.string().array().nonempty(),
  bannerImg: z.string(),
  bannerImgSm: z.string(),
  bannerTitle: z.string(),
  bannerDescription: z.string(),
});

export const getProductSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  }),
});

export const getProductsSchema = z.object({
  params: z.object({
    gender: z.enum(["mens", "womens"]),
    category: z.string().optional(),
    style: z.string().optional(),
  }),
});

export const addProductSchema = z.object({
  body: Product,
});

export const addProductsSchema = z.object({
  body: Product.array(),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  }),
});

export type addProductRequest = z.infer<typeof addProductSchema>;
export type addProductsRequest = z.infer<typeof addProductsSchema>;
export type getProductRequest = z.infer<typeof getProductSchema>;
export type getProductsRequest = z.infer<typeof getProductsSchema>;
export type deleteProductRequest = z.infer<typeof deleteProductSchema>;
