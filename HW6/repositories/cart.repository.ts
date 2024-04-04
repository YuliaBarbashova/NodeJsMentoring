import { CartModel } from "../models/carts.model.ts";
import { CartEntity, CartItemEntity, ProductEntity } from "../types/index.ts";

export const getCartByUserId = (id: string) => {
  return CartModel.getCart(id);
};

export const createNewCart = (id: string) => {
  return CartModel.createCart(id);
};

export const updateCardByUserId = (
  cart: CartEntity,
  product: ProductEntity,
  count: CartItemEntity["count"]
) => {
  return CartModel.updateCart(cart, product, count);
};

export const deleteCardByUserId = (cart: CartEntity, isCheckout?: boolean) => {
  return CartModel.clearCart(cart, isCheckout);
};
