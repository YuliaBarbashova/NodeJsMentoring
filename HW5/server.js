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

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === PATH) {
    getUsers(req, res);
  } else if (
    req.method === "GET" &&
    req.url.indexOf(PATH) === 0 &&
    req.url.indexOf("/hobbies") > 0
  ) {
    const userId = req.url.split("/")[3];
    getUserHobbies(req, res, userId);
  } else if (req.method === "POST" && req.url === PATH) {
    addUser(req, res);
  } else if (
    req.method === "PATCH" &&
    req.url.indexOf(PATH) === 0 &&
    req.url.indexOf("/hobbies") > 0
  ) {
    const userId = req.url.split("/")[3];
    updateHobbies(req, res, userId);
  } else if (req.method === "DELETE" && req.url.indexOf(PATH) === 0) {
    const userId = req.url.split("/")[3];
    deleteUser(req, res, userId);
  } else {
    res.statusCode = 404;
    res.write({ message: `Error` });
    res.end();
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
