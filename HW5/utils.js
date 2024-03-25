const fs = require("fs");

const { PATH } = require("./constants");

const writeDataInFile = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), "utf8", (err) =>
    console.log(err)
  );
};

const getReqBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", () => {
          resolve(body);
        });
    } catch {}
  });
};

const formatUserData = (user) => ({
  user,
  links: {
    self: `${PATH}/${user.id}`,
    hobbies: `${PATH}/${user.id}/hobbies`,
  },
});

const userNotFoundBody = (userId) =>
  JSON.stringify({
    data: null,
    error: `User with id ${userId} doesn't exist`,
  });

module.exports = {
  writeDataInFile,
  getReqBody,
  formatUserData,
  userNotFoundBody
};
