import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

import sequelize from "../utils/ConnectToDB.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  staffId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["male", "female"]],
    },
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define a hook to hash the password before saving the user

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
});

// Add a method to compare the provided password with the hashed password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  const token = JWT.sign({ userId: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export default User;
