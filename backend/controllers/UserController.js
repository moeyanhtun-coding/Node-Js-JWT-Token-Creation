const User = require("../models/User");
const createToken = require("../helpers/createToken");

const UserController = {
  userLogin: async (req, res) => {
    try {
      return res.json({ msg: "Hit the router Login" });
    } catch (error) {}
  },
  userRegister: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxSession: 3 * 24 * 60 * 60,
      });
      return res.json({ user, token });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};

module.exports = UserController;
