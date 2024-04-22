import { ProductEntity } from "../types/index.ts";
import productList from "../data/products.json" assert { type: 'json' };

let products = [...productList];

const getProductById = (
  productsId: string
): Promise<ProductEntity | undefined> => {
  return new Promise((resolve, reject) => {
    const product = products.find((u) => u.id === productsId);

    resolve(product);
  });
};

const getAllProducts = (): Promise<ProductEntity[] | undefined> => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

export const ProductrModel = {
  getProductById,
  getAllProducts
};
