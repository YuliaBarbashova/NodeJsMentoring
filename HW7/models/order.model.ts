import Order, {IOrder} from './schemas/order.schema.ts';

import { OrderEntity } from "../types/index.ts";


type newOrderType = Omit<OrderEntity, "_id">;

const addNewOrder = (newOrder: newOrderType): Promise<IOrder> => {
  return new Promise((resolve, reject) => {
    const order = new Order(newOrder);
    const savedOrder = order.save();
    resolve(savedOrder);
  });
};

export const OrderModel = { addNewOrder };
