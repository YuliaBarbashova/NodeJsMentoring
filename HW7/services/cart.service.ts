import {
  getCartByUserId,
  createNewCart,
  updateCardByUserId,
  deleteCardByUserId,
  createNewOrder,
  findProduct,
} from "../repositories/index.ts";
import {
  CartEntity,
  ProductEntity,
  OrderEntity,
  PaymentEntity,
  DeliveryEntity,
} from "../types/index.ts";

const getUserCart = async (userId: string): Promise<CartEntity | null> => {
  return getCartByUserId(userId);
};

const createCart = async (userId: string): Promise<CartEntity> => {
  return createNewCart(userId);
};
const updateUserCart = async (
  userId: string,
  productId: string,
  count: number
) => {
  const product: ProductEntity | null = await findProduct(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cart: CartEntity | null = await getCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }
  console.log('product', product);

  cart = await updateCardByUserId(cart, product, count);

  return cart;
};

const clearCart = async (userId: string): Promise<CartEntity | null> => {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }
  return deleteCardByUserId(cart);
};

const createOrder = async (
  userId: string,
  payment?: PaymentEntity,
  delivery?: DeliveryEntity,
  comments?: string
): Promise<OrderEntity> => {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  return createNewOrder(cart, payment, delivery, comments).then((order) => {
    deleteCardByUserId(cart);
    return order;
  });
};

export const CartService = {
  getUserCart,
  createCart,
  updateUserCart,
  clearCart,
  createOrder,
};
