import Cart, { ICart } from "./schemas/cart.schema.ts";

import { CartEntity, CartItemEntity, ProductEntity } from "../types/index.ts";

const getCart = (id: string): Promise<ICart | null> => {
  return new Promise((resolve, reject) => {
    const cart = Cart.findOne({ userId: id });
    resolve(cart);
  });
};

const createCart = (userId: string): Promise<ICart> => {
  return new Promise((resolve, reject) => {
    const newCart = new Cart({
      userId: userId,
      isDeleted: false,
      items: [],
    });
    const savedCart = newCart.save();
    resolve(savedCart);
  });
};

const updateCart = async (
  cart: CartEntity,
  product: ProductEntity,
  count: CartItemEntity["count"]
): Promise<ICart | null> => {
  return new Promise((resolve, reject) => {
    let updatedItems = [...cart.items];

    const existingItemIndex = updatedItems.findIndex(
      (item) => {
        console.log('item', item)
        return item.product._id === product._id}
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

    const updatedCart = Cart.findOneAndUpdate(
      { _id: cart._id },
      { items: updatedItems },
      { new: true }
    );

    resolve(updatedCart);
  });
};

const clearCart = (cart: CartEntity): Promise<ICart | null> => {
  return new Promise((resolve, reject) => {
    const updatedCart = Cart.findOneAndUpdate(
      { _id: cart._id },
      { isDeleted: true },
      { new: true }
    );

    resolve(updatedCart);
  });
};

export const CartModel = {
  getCart,
  updateCart,
  clearCart,
  createCart,
};
