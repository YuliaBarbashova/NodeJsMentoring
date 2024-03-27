const http = require("http");
const {
  getUserHobbies,
  updateHobbies,
} = require("./controllers/hobbiesController");
const {
  getUsers,
  addUser,
  deleteUser,
} = require("./controllers/usersController");
const { PATH } = require("./constants");
const { isPathValid, updateRes } = require("./utils");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === PATH) {
    getUsers(req, res);
  } else if (
    req.method === "GET" &&
    isPathValid({
      requestPath: req.url,
      end: "/hobbies",
      isUuid: true,
      length: 5,
    })
  ) {
    const userId = req.url.split("/")[3];
    getUserHobbies(req, res, userId);
  } else if (req.method === "POST" && req.url === PATH) {
    addUser(req, res);
  } else if (
    req.method === "PATCH" &&
    isPathValid({
      requestPath: req.url,
      end: "/hobbies",
      isUuid: true,
      length: 5,
    })
  ) {
    const userId = req.url.split("/")[3];
    updateHobbies(req, res, userId);
  } else if (
    req.method === "DELETE" &&
    isPathValid({
      requestPath: req.url,
      isUuid: true,
      length: 4,
    })
  ) {
    const userId = req.url.split("/")[3];
    deleteUser(req, res, userId);
  } else {
    updateRes({ res, statusCode: 404, message: `Incorrect path` });
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
