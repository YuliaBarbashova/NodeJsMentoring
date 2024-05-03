import { UserModel } from "../models/user.model.ts";
import { UserEntity } from "../types/index.ts";

export const findUserById = (id: string) => {
  return UserModel.getUserById(id);
};
export const findUser = (props: Partial<UserEntity>) => {
  return UserModel.getUser({ ...props });
};

export const createUser = (email: string, password: string, role: string) => {
  return UserModel.addNewUser(email, password, role);
};
