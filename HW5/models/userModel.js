const { v4: uuidv4 } = require("uuid");
const path = require("path");

const users = require("../data/users.json");
const hobbies = require("../data/hobbies.json");
const { writeDataInFile } = require("../utils");

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

const createUser = (user, userHobbies) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    const usersList = [...users, newUser];
    const hobbiesList = [
      ...hobbies,
      { id: uuidv4(), userId: newUser.id, hobbies: userHobbies },
    ];
    writeDataInFile(path.join(__dirname, "../data", "users.json"), usersList);
    writeDataInFile(
      path.join(__dirname, "../data", "hobbies.json"),
      hobbiesList
    );
    resolve(newUser);
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
