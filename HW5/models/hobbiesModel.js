const path = require("path");
const hobbiesList = require("../data/hobbies.json");
const { writeDataInFile } = require("../utils");

let hobbies = hobbiesList;

const getHobbiesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const userHobbies = hobbies.find((item) => item.userId === userId);
    resolve(userHobbies);
  });
};

const updateUserHobbies = (id, newHobbies) => {
  return new Promise((resolve, reject) => {
    let updatedHobbies;
    const updatedHobbiesList = hobbies.map((item) => {
      if (item.userId === id) {
        updatedHobbies = { ...item, hobbies: newHobbies };
        return updatedHobbies;
      }
      return item;
    });
    writeDataInFile(
      path.join(__dirname, "../data", "hobbies.json"),
      updatedHobbiesList
    );
    hobbies = updatedHobbiesList;
    resolve();
  });
};

const createHobbies = (userHobbies) => {
  return new Promise((resolve, reject) => {
    const updatedHobbiesList = [...hobbies, userHobbies];
    writeDataInFile(
      path.join(__dirname, "../data", "hobbies.json"),
      updatedHobbiesList
    );
    hobbies = updatedHobbiesList;
    resolve();
  });
};

const removeHobbies = (id) => {
  return new Promise((resolve, reject) => {
    const updatedHobbiesList = hobbies.filter((item) => item.userId !== id);
    writeDataInFile(
      path.join(__dirname, "../data", "hobbies.json"),
      updatedHobbiesList
    );
    hobbies = updatedHobbiesList;
    resolve();
  });
};

module.exports = {
  getHobbiesByUserId,
  updateUserHobbies,
  removeHobbies,
  createHobbies,
};
