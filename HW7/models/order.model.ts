import * as path from "path";
import { v4 as uuidv4 } from "uuid";

import ordersList from "../data/orders.json" assert { type: "json" };
import { writeDataInFile } from "../utils.ts";
import { OrderEntity } from "../types/index.ts";

let orders = [...ordersList] as OrderEntity[];

type newOrderType = Omit<OrderEntity, "id">;

const addNewOrder = (newOrder: newOrderType): Promise<OrderEntity> => {
  return new Promise((resolve, reject) => {
    const order: OrderEntity = {
      ...newOrder,
      id: uuidv4(),
    };

    orders = [...orders, order];
    writeDataInFile("./data", "orders.json", orders);

    resolve(order);
  });
};

export const OrderModel = { addNewOrder };
