import { findUserByCreds, createUser } from "../repositories/index.ts";

const getUser = (email: string, password: string) => {
    return findUserByCreds(email, password);
}

const createNewUser = (email: string, password: string, role: string) => {
    return createUser(email, password, role);
  };

export const UserService = {
    getUser,
    createNewUser
}