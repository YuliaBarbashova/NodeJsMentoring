import { ProductrModel } from "../models/product.model.ts";

export const findProduct = (id: string) => {
  return ProductrModel.getProductById(id);
};

export const getProductList = () => {
  return ProductrModel.getAllProducts();
}