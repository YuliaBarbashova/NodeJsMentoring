const HobbiesModel = require("../models/hobbiesModel");
const UserModel = require("../models/userModel");
const { userNotFoundBody, getReqBody, formatUserData } = require("../utils");
const { PATH } = require("../constants");

// @route GET /api/users/:userId/hobbies
const getUserHobbies = async (req, res, userId) => {
  try {
    const userHobbies = await HobbiesModel.getHobbiesByUserId(userId);
    if (!userHobbies) {
      res.statusCode = 404;
      res.write(userNotFoundBody(userId));
      res.end();
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
      res.writeHead(200, {
        "Cache-Control": "private, max-age=3600",
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(responseObject));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

// @route PATCH /api/users/:userId/hobbies
const updateHobbies = async (req, res, userId) => {
  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      res.statusCode = 404;
      res.write(userNotFoundBody(userId));
      res.end();
    } else {
      const userHobbies = await HobbiesModel.getHobbiesByUserId(userId);
      let body = await getReqBody(req);
      const { hobbies } = JSON.parse(body);
      if (!hobbies) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Invalid request: Missing required fields",
          })
        );
      } else {
        newHobbies = Array.from(new Set([...userHobbies.hobbies, ...hobbies]));
        await HobbiesModel.updateUserHobbies(user.id, newHobbies);
        const formatedData = formatUserData(user);
        const responseObject = {
          data: formatedData,
          error: null,
        };
        res.statusCode = 200;
        res.setHeader("Content-Type", "aplication/json");
        res.write(JSON.stringify(responseObject));
        res.end();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserHobbies,
  updateHobbies,
};
