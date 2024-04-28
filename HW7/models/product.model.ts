import Product from "./schemas/product.schema.ts";

import { ProductEntity } from "../types/index.ts";

const getProductById = async (productId: string): Promise<ProductEntity | null> => {
  const product = await Product.findOne({ _id: productId });
  return product;
};

const getAllProducts = async (): Promise<ProductEntity[] | undefined> => {
  const products = await Product.find();
  return products;
};

export const ProductrModel = {
  getProductById,
  getAllProducts,
};
