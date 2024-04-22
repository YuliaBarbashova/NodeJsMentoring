import { UserModel } from "../models/user.model.ts";

export const findUserById = (id: string) => {
  return UserModel.getUserById(id);
};
export const findUserByCreds = (email: string, password: string) => {
  return UserModel.getUserByCredentials(email, password);
};

export const createUser = (email: string, password: string, role: string) => {
  return UserModel.addNewUser(email, password, role);
};
