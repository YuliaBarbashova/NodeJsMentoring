import { OrderModel } from "../models/order.model.ts";
import { CartEntity, DeliveryEntity, PaymentEntity } from "../types/index.ts";

export const createNewOrder = (
  cart: CartEntity,
  payment?: PaymentEntity,
  delivery?: DeliveryEntity,
  comments?: string
) => {
  return OrderModel.addNewOrder({
    userId: cart.userId,
    cartId: cart.id,
    items: cart.items,
    payment,
    delivery,
    comments,
    status: "created",
    total: cart.items.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    ),
  });
};
