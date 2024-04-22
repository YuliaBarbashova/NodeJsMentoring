import User from "./schemas/user.schema.ts";

import { UserEntity } from "../types/index.ts";

const getUserById = (userId: string): Promise<UserEntity | null> => {
  return new Promise((resolve, reject) => {
    const user = User.findOne({ _id: userId });
    resolve(user);
  });
};

const getUserByCredentials = (
  email: string,
  password: string
): Promise<UserEntity | null> => {
  return new Promise((resolve, reject) => {
    const user = User.findOne({ email, password });
    resolve(user);
  });
};

const addNewUser = (
  email: string,
  password: string,
  role: string
): Promise<UserEntity> => {
  return new Promise((resolve, reject) => {
    const user = new User({ email, password, role });
    const savedUser = user.save();
    resolve(savedUser);
  });
};

export const UserModel = {
  getUserById,
  getUserByCredentials,
  addNewUser
};
