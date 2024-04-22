import * as path from "path";

import { v4 as uuidv4 } from "uuid";

import cartsList from "../data/carts.json" assert { type: "json" };
import { writeDataInFile } from "../utils.ts";
import { CartEntity, CartItemEntity, ProductEntity } from "../types/index.ts";

let carts = [...cartsList];

const getCart = (userId: string): Promise<CartEntity | undefined> => {
  return new Promise((resolve, reject) => {
    const cart = carts.find((u) => u.userId === userId && !u.isDeleted);

    resolve(cart);
  });
};

const saveCarts = (userId: string, newCart: CartEntity): CartEntity[] => {
  const otherCarts = carts.filter((cart) => cart.userId !== userId);
  carts = [...otherCarts, newCart];
  writeDataInFile("./data", "carts.json", carts);
  return carts;
};

const createCart = (userId: string): Promise<CartEntity> => {
  return new Promise((resolve, reject) => {
    const newCart = {
      id: uuidv4(),
      userId: userId,
      isDeleted: false,
      items: [],
    };
    saveCarts(userId, newCart);
    resolve(newCart);
  });
};

const updateCart = (
  cart: CartEntity,
  product: ProductEntity,
  count: CartItemEntity["count"]
): Promise<CartEntity> => {
  return new Promise((resolve, reject) => {
    let updatedItems = [...cart.items];

    const existingItemIndex = updatedItems.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingItemIndex > -1) {
      if (count === 0) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex].count = count;
      }
    } else {
      updatedItems = [
        ...updatedItems,
        {
          product: product,
          count: count,
        },
      ];
    }

    const newCart = { ...cart, items: updatedItems };

    saveCarts(cart.userId, newCart);
    resolve(newCart);
  });
};

const clearCart = (
  cart: CartEntity,
  isCheckout?: boolean
): Promise<CartEntity> => {
  return new Promise((resolve, reject) => {
    const userCart = { ...cart };
    if (isCheckout) userCart.items = [];
    userCart.isDeleted = true;
    saveCarts(cart.userId, userCart);
    resolve(userCart);
  });
};

export const CartModel = {
  getCart,
  updateCart,
  clearCart,
  createCart,
};
