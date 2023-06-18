import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

import sequelize from "../utils/ConnectToDB";

const User = sequelize.define("User", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true,
  // },
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
    unique: true,
  },
  staffID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

// Add a method to compare the provided password with the hashed password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
