import Cart, { ICart } from "./schemas/cart.schema.ts";

import { CartEntity, CartItemEntity, ProductEntity } from "../types/index.ts";

const getCart = async (id: string, deleted = false): Promise<ICart | null> => {
  const cart = await Cart.findOne({ userId: id, isDeleted: deleted });
  return cart;
};

const createCart = async (userId: string): Promise<ICart> => {
  const newCart = new Cart({
    userId: userId,
    isDeleted: false,
    items: [],
  });
  const savedCart = await newCart.save();
  return savedCart;
};

const updateCart = async (
  cart: CartEntity,
  product: ProductEntity,
  count: CartItemEntity["count"]
): Promise<ICart | null> => {
  let updatedItems = [...cart.items];

  const existingItemIndex = updatedItems.findIndex((item) => {
    return item.product._id === product._id;
  });
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

  const updatedCart = await Cart.findOneAndUpdate(
    { _id: cart._id },
    { items: updatedItems },
    { new: true }
  );

  return updatedCart;
};

const clearCart = async (cart: CartEntity): Promise<ICart | null> => {
  const updatedCart = await Cart.findOneAndUpdate(
    { _id: cart._id },
    { isDeleted: true },
    { new: true }
  );

  return updatedCart;
};

export const CartModel = {
  getCart,
  updateCart,
  clearCart,
  createCart,
};
