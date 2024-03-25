const UserModel = require("../models/userModel");
const HobbiesModel = require("../models/hobbiesModel");
const { getReqBody, formatUserData, userNotFoundBody } = require("../utils");

// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    const formatedUsers = users.map((user) => formatUserData(user));
    const responseObject = {
      data: formatedUsers,
      error: null,
    };
    res.writeHead(200, {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(responseObject));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

// @route POST /api/users
const addUser = async (req, res) => {
  try {
    let body = await getReqBody(req);
    const { name, email, hobbies } = JSON.parse(body);
    if (!name || !email) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Invalid request: Missing required fields" })
      );
    } else {
      const user = {
        name,
        email,
      };
      const userHobbies = hobbies || [];
      const newUser = await UserModel.createUser(user, userHobbies);
      const formatedData = formatUserData(newUser);
      const responseObject = {
        data: formatedData,
        error: null,
      };

      res.statusCode = 201;
      res.setHeader("Content-Type", "aplication/json");
      res.write(JSON.stringify(responseObject));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

// @route DELETE /api/users/:userId
const deleteUser = async (req, res, userId) => {
  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      res.statusCode = 404;
      res.write(userNotFoundBody(userId));
      res.end();
    } else {
      await UserModel.removeUser(user.id);
      await HobbiesModel.removeHobbies(user.id);
      res.statusCode = 200;
      res.setHeader("Content-Type", "aplication/json");
      res.write(
        JSON.stringify({
          data: { success: true },
          error: null,
        })
      );
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};
