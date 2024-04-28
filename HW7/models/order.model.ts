import Order, { IOrder } from "./schemas/order.schema.ts";

import { OrderEntity } from "../types/index.ts";

type newOrderType = Omit<OrderEntity, "_id">;

const addNewOrder = async (newOrder: newOrderType): Promise<IOrder> => {
  const order = new Order(newOrder);
  const savedOrder = await order.save();
  return savedOrder;
};

export const OrderModel = { addNewOrder };
