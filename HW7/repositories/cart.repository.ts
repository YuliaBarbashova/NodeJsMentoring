import { CartModel } from "../models/carts.model.ts";
import { CartEntity, CartItemEntity, ProductEntity } from "../types/index.ts";

export const getCartByUserId = (id: string) => {
  return CartModel.getCart(id);
};

export const createNewCart = (id: string): Promise<CartEntity> => {
  return CartModel.createCart(id);
};

export const updateCartByUserId = (
  cart: CartEntity,
  product: ProductEntity,
  count: CartItemEntity["count"]
) => {
  return CartModel.updateCart(cart, product, count);
};

export const deleteCartByUserId = (cart: CartEntity) => {
  return CartModel.clearCart(cart);
};
