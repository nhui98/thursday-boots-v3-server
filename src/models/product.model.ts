import mongoose from "mongoose";

export interface IProduct {
  slug: string;
  category: string;
  gender: string;
  style: string;
  color: string;
  price: string;
  images: string[];
  sizes: {
    size: number;
    stock: number;
  }[];
  productFeatures: string[];
  bannerImg: string;
  bannerImgSm: string;
  bannerTitle: string;
  bannerDescription: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    style: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String, required: true }],
    sizes: [
      {
        size: { type: Number, required: true },
        stock: { type: Number, required: true },
      },
    ],
    productFeatures: [{ type: String, required: true }],
    bannerImg: { type: String, required: true },
    bannerImgSm: { type: String, required: true },
    bannerTitle: { type: String, required: true },
    bannerDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
