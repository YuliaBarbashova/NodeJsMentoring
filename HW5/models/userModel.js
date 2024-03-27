const path = require("path");
const usersList = require("../data/users.json");
const { writeDataInFile } = require("../utils");

let users = usersList;

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === userId);
    resolve(user);
  });
};

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const updatedUsersList = [...users, user];
    writeDataInFile(
      path.join(__dirname, "../data", "users.json"),
      updatedUsersList
    );
    users = updatedUsersList;
    resolve(user);
  });
};

const updateUserHobbies = (id, updatedHobbies) => {
  return new Promise((resolve, reject) => {
    let updatedUser;
    const updatedUsersList = users.map((user) => {
      if (user.id === id) {
        updatedUser = { ...user, hobbies: updatedHobbies };
        return updatedUser;
      }
      return user;
    });
    writeDataInFile(
      path.join(__dirname, "../data", "users.json"),
      updatedUsersList
    );
    users = updatedUsersList;
    resolve();
  });
};

const removeUser = (id) => {
  return new Promise((resolve, reject) => {
    const updatedUsersList = users.filter((user) => user.id !== id);
    writeDataInFile(
      path.join(__dirname, "../data", "users.json"),
      updatedUsersList
    );
    users = updatedUsersList;
    resolve();
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserHobbies,
  removeUser,
};
