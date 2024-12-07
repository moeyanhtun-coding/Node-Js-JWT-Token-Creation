const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.register = async function (name, email, password) {
  const userExist = await this.findOne({ email });
  if (userExist) {
    throw new Error("User already Exist");
  }
  let salt = await bcrypt.genSalt();
  let hashValue = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hashValue });
  return user;
};

module.exports = mongoose.model("User", UserSchema);
