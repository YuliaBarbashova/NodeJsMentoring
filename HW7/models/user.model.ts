import User from "./schemas/user.schema.ts";

import { UserEntity } from "../types/index.ts";

const getUserById = async (userId: string): Promise<UserEntity | null> => {
  const user = await User.findOne({ _id: userId });
  return user;
};

const getUserByCredentials = async (
  email: string,
  password: string
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email, password });
  return user;
};

const addNewUser = async (
  email: string,
  password: string,
  role: string
): Promise<UserEntity> => {
  const user = new User({ email, password, role });
  const savedUser = await user.save();
  return savedUser;
};

export const UserModel = {
  getUserById,
  getUserByCredentials,
  addNewUser,
};
