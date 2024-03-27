const fs = require("fs");
const { PATH, uuidRegex } = require("./constants");

const writeDataInFile = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf8", (err) =>
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

const updateRes = ({ res, statusCode, message, headers }) => {
  headers ? res.writeHead(statusCode, headers) : (res.statusCode = statusCode);
  res.write(message);
  res.end();
};

const isPathValid = ({ requestPath, end, isUuid, length }) => {
  if (!requestPath.startsWith(PATH)) return false;

  const params = requestPath.split("/");

  if (end && !requestPath.endsWith(end)) return false;

  if (isUuid && !uuidRegex.test(params[3])) return false;

  if (length && params.length !== length) return false;

  return true;
};

module.exports = {
  writeDataInFile,
  getReqBody,
  formatUserData,
  userNotFoundBody,
  updateRes,
  isPathValid
};
