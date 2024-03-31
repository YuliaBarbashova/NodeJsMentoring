const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/userModel");
const HobbiesModel = require("../models/hobbiesModel");
const {
  getReqBody,
  formatUserData,
  userNotFoundBody,
  updateRes,
} = require("../utils");

// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    const formatedUsers = users.map((user) => formatUserData(user));
    const responseObject = {
      data: formatedUsers,
      error: null,
    };
    updateRes({
      res,
      statusCode: 200,
      message: JSON.stringify(responseObject),
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    updateRes({ res, statusCode: 500, message: JSON.stringify(error) });
  }
};

// @route POST /api/users
const addUser = async (req, res) => {
  try {
    let body = await getReqBody(req);
    const { name, email, hobbies } = JSON.parse(body);
    if (!name || !email) {
      updateRes({
        res,
        statusCode: 400,
        message: JSON.stringify({
          message: "Invalid request: Missing required fields",
        }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const user = {
        id: uuidv4(),
        name,
        email,
      };
      const userHobbies = {
        id: uuidv4(),
        userId: user.id,
        hobbies: hobbies || [],
      };
      const newUser = await UserModel.createUser(user);
      await HobbiesModel.createHobbies(userHobbies);
      const formatedData = formatUserData(newUser);
      const responseObject = {
        data: formatedData,
        error: null,
      };
      updateRes({
        res,
        statusCode: 201,
        message: JSON.stringify(responseObject),
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    updateRes({ res, statusCode: 500, message: JSON.stringify(error) });
  }
};

// @route DELETE /api/users/:userId
const deleteUser = async (req, res, userId) => {
  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      updateRes({ res, statusCode: 404, message: userNotFoundBody(userId) });
    } else {
      await UserModel.removeUser(user.id);
      await HobbiesModel.removeHobbies(user.id);
      updateRes({
        res,
        statusCode: 200,
        message: JSON.stringify({
          data: { success: true },
          error: null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    updateRes({ res, statusCode: 500, message: JSON.stringify(error) });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};
