import express from "express";
import {
  addProduct,
  addProducts,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller";
import validateRequest from "../middleware/validateRequest";
import {
  addProductSchema,
  addProductsSchema,
  deleteProductSchema,
  getProductSchema,
  getProductsSchema,
} from "../schemas/product.schemas";

const productRouter = express.Router();

productRouter.get(
  "/getproduct/:id",
  validateRequest(getProductSchema),
  getProduct
);

productRouter.get(
  "/getproducts/:gender",
  validateRequest(getProductsSchema),
  getProducts
);

productRouter.get(
  "/getproducts/:gender/:category",
  validateRequest(getProductsSchema),
  getProducts
);

productRouter.get(
  "/getproducts/:gender/:category/:style",
  validateRequest(getProductsSchema),
  getProducts
);

productRouter.post(
  "/addproduct",
  validateRequest(addProductSchema),
  addProduct
);

productRouter.post(
  "/addproducts",
  validateRequest(addProductsSchema),
  addProducts
);

productRouter.delete(
  "/deleteproduct/:id",
  validateRequest(deleteProductSchema),
  deleteProduct
);

export default productRouter;
