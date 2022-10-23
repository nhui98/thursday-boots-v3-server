import { Request, Response } from "express";
import {
  addProductRequest,
  addProductsRequest,
} from "../schemas/product.schemas";
import Product from "../models/product.model";

export async function getProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("No product found");

    res.status(200).json(product);
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}

export async function getProducts(req: Request, res: Response) {
  const { gender, category, style } = req.params;

  const query: { gender: string; category?: string; style?: string } = {
    gender,
  };

  if (category) query.category = category;
  if (style) query.category = category;

  try {
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}

export async function addProduct(req: Request, res: Response) {
  const newProduct = req.body as addProductRequest["body"];

  try {
    const product = await new Product(newProduct).save();
    res.status(201).json({ message: "Product successfully added", product });
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}

export async function addProducts(req: Request, res: Response) {
  const newProducts = req.body as addProductsRequest["body"];

  try {
    const products = await Product.insertMany(newProducts);
    res.status(201).json({ message: "Products successfully added", products });
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deletedProduct = await Product.findOneAndDelete({ id });
    res
      .status(200)
      .json({ message: "Product successfully deleted", deletedProduct });
  } catch (e) {
    if (e instanceof Error) res.status(409).json(e.message);
  }
}
