const express = require("express");
const UserController = require("../controllers/UserController");
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const router = express.Router();

router.post("/login", UserController.userLogin);
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
  ],
  handleErrorMessage,
  UserController.userRegister
);

module.exports = router;
