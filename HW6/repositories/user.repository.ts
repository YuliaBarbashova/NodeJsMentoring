import { UserModel } from "../models/user.model.ts";

export const findUserById = async (id: string) => {
  const users = await UserModel.getUsers();
  const user = users?.find((user) => user.id === id);
  return user;
};
export const findUserByCreds = async (email: string, password: string) => {
  const users = await UserModel.getUsers();
  const user = users?.find(
    (user) => user.email === email && user.password === password
  );
  return user;
};

export const createUser = (email: string, password: string, role: string) => {
  return UserModel.addNewUser(email, password, role);
};
