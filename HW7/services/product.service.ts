import { findProduct, getProductList  } from "../repositories/index.ts";

const getProduct = (id:string) => {
    return findProduct(id);
}

const getAllProducts = () => {
  return getProductList()
}

export const ProductService = {
    getProduct,
    getAllProducts
}