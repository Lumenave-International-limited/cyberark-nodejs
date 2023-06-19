// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register a new user
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    account,
    staffId,
    gender,
    department,
    email,
    password,
  } = req.body;

  console.log(req.body);

  try {
    // Check if the user with the provided staffId or email already exists
    await User.sync({ force: true });

    // const existingUser = await User.findOne({
    //   where: {
    //     [Op.or]: [{ staffId: staffId }, { email: email }],
    //   },
    // });

    const existingUser = await User.findOne({ where: { email } });

    console.log({ existingUser: existingUser });

    if (existingUser) {
      return res.status(409).json({
        error: "User with the provided staffId or email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      account,
      staffId,
      gender,
      department,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstname: newUser.firstName,
        lastname: newUser.lastName,
        account: newUser.account,
        staffId: newUser.staffId,
        gender: newUser.gender,
        department: newUser.department,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    // Find the user by staffId
    const user = await User.findOne({ where: { staffId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const passwordMatch = await user.verifyPassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = user.generateToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
    // Get the user ID from the request (assuming it's stored in req.userId after authentication middleware)
    const userId = req.userId;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user details" });
  }
};

export { registerUser };
