import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IProduct extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  _id: { type: String, required: true, default: uuidv4 },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
