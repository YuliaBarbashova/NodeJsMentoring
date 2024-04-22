import Product from "./schemas/product.schema.ts";

import { ProductEntity } from "../types/index.ts";

const getProductById = (
  productId: string
): Promise<ProductEntity | null> => {
  return new Promise((resolve, reject) => {
    const product = Product.findOne({ _id: productId });
    resolve(product);
  });
};

const getAllProducts = (): Promise<ProductEntity[] | undefined> => {
  return new Promise((resolve, reject) => {
    const products = Product.find();
    resolve(products);
  });
};

export const ProductrModel = {
  getProductById,
  getAllProducts
};
