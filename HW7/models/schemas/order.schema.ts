import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import {
  CartItemEntity,
  PaymentEntity,
  DeliveryEntity,
} from "../../types/index.ts";
import { ProductSchema } from "./product.schema.ts";

export interface IOrder extends Document {
  _id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment?: PaymentEntity;
  delivery?: DeliveryEntity;
  comments?: string;
  status: string;
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: {
    type: [
      {
        count: { type: Number, required: true },
        product: { type: ProductSchema },
      },
    ],
  },
  payment: {
    type: {
      type: { type: String, required: false },
      address: { type: String, required: false },
      creditCard: { type: String, required: false },
    },
  },
  delivery: {
    type: {
      type: { type: String, required: false },
      address: { type: String, required: false },
    },
  },
  comments: { type: Number, required: false },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  _id: { type: String, required: true, default: uuidv4 },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
