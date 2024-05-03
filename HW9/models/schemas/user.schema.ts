import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

interface IUser extends Document {
  role: string,
  email: string,
  password: string,
  _id: string
}

const UserSchema: Schema = new Schema({
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  _id: { type: String, required: true, default: uuidv4 },
});

export default mongoose.model<IUser>('User', UserSchema);