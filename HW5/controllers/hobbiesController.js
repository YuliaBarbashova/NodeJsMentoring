const HobbiesModel = require("../models/hobbiesModel");
const UserModel = require("../models/userModel");
const {
  userNotFoundBody,
  getReqBody,
  formatUserData,
  updateRes,
} = require("../utils");
const { PATH } = require("../constants");

// @route GET /api/users/:userId/hobbies
const getUserHobbies = async (req, res, userId) => {
  try {
    const userHobbies = await HobbiesModel.getHobbiesByUserId(userId);
    if (!userHobbies) {
      updateRes({ res, statusCode: 404, message: userNotFoundBody(userId) });
    } else {
      const formatedData = {
        hobbies: userHobbies.hobbies,
        links: {
          self: `${PATH}/${userHobbies.userId}/hobbies`,
          user: `${PATH}/${userHobbies.userId}`,
        },
      };
      const responseObject = {
        data: formatedData,
        error: null,
      };
      updateRes({
        res,
        statusCode: 200,
        message: JSON.stringify(responseObject),
        headers: {
          "Cache-Control": "private, max-age=3600",
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    updateRes({ res, statusCode: 500, message: JSON.stringify(error) });
  }
};

// @route PATCH /api/users/:userId/hobbies
const updateHobbies = async (req, res, userId) => {
  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      updateRes({ res, statusCode: 404, message: userNotFoundBody(userId) });
    } else {
      const userHobbies = await HobbiesModel.getHobbiesByUserId(userId);
      let body = await getReqBody(req);
      const { hobbies } = JSON.parse(body);
      if (!hobbies) {
        updateRes({
          res,
          statusCode: 400,
          message: JSON.stringify({
            message: "Invalid request: Missing required fields",
          }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        const newHobbies = Array.from(
          new Set([...userHobbies.hobbies, ...hobbies])
        );
        await HobbiesModel.updateUserHobbies(user.id, newHobbies);
        const formatedData = formatUserData(user);
        const responseObject = {
          data: formatedData,
          error: null,
        };
        updateRes({
          res,
          statusCode: 200,
          message: JSON.stringify(responseObject),
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } catch (error) {
    updateRes({ res, statusCode: 500, message: JSON.stringify(error) });
  }
};

module.exports = {
  getUserHobbies,
  updateHobbies,
};
