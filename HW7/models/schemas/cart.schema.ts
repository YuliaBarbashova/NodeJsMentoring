import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ProductSchema, IProduct } from "./product.schema.ts";

export interface ICart extends Document {
  _id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: { count: number; product: IProduct }[] | [];
}

export const CartSchema: Schema = new Schema({
  _id: { type: String, required: true, default: uuidv4 }, // uuid
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: {
    type: [
      {
        count: { type: Number, required: true },
        product: { type: ProductSchema },
      },
    ],
  },
});

export default mongoose.model<ICart>("Cart", CartSchema);
