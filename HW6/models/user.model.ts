import { v4 as uuidv4 } from "uuid";
import * as path from "path";

import { UserEntity } from "../types/index.ts";
import userList from "../data/users.json" assert { type: "json" };
import { writeDataInFile } from "../utils.ts";

let users = [...userList];

const getUserById = (userId: string): Promise<UserEntity | undefined> => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === userId);

    resolve(user);
  });
};

const getUserByCredentials = (
  email: string,
  password: string
): Promise<UserEntity | undefined> => {
  return new Promise((resolve, reject) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    resolve(user);
  });
};

const getUsers = (): Promise<UserEntity[] | undefined> => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

const addNewUser = (
  email: string,
  password: string,
  role: string
): Promise<UserEntity> => {
  return new Promise((resolve, reject) => {
    const user = { id: uuidv4(), email, password, role };
    users = [...users, user];
    writeDataInFile("./data", "users.json", users);
    resolve(user);
  });
};

export const UserModel = {
  getUserById,
  getUserByCredentials,
  addNewUser,
  getUsers,
};
