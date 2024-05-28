import { findUser, createUser } from "../repositories/index.ts";
import { UserEntity } from "../types/index.ts";

const getUser = (props:Partial<UserEntity>) => {
    return findUser(props);
}

const createNewUser = (email: string, password: string, role: string) => {
    return createUser(email, password, role);
  };

export const UserService = {
    getUser,
    createNewUser
}