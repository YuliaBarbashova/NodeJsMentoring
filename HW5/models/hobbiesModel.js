const path = require("path");

const hobbies = require("../data/hobbies.json");
const { writeDataInFile } = require("../utils");

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
    resolve();
  });
};

module.exports = {
  getHobbiesByUserId,
  updateUserHobbies,
  removeHobbies
};
