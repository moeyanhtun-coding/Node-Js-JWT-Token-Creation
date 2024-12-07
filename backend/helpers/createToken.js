const jwt = require("jsonwebtoken");

const maxSession = 3 * 24 * 60 * 60;

const createToken = function createToken(_id) {
  return jwt.sign({ _id }, "mysecret", { expiresIn: maxSession });
};

module.exports = createToken;
