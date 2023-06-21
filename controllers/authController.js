import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

// Register a new user

const registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    account,
    staffId,
    gender,
    department,
    password,
  } = req.body;

  if (
    !email ||
    !firstName ||
    !lastName ||
    !account ||
    !staffId ||
    !gender ||
    !department ||
    !password
  ) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if the user with the provided staffId or email already exists

  const userAlreadyExists = await User.findOne({ where: { email } });

  if (userAlreadyExists) {
    throw new BadRequestError("Email or staff ID already in use");
  }

  // Create the new user
  const newUser = await User.create({
    email,
    firstName,
    lastName,
    account,
    staffId,
    gender,
    department,
    password,
  });

  const token = await newUser.generateToken();
  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      staffId: newUser.staffId,
      gender: newUser.gender,
      department: newUser.department,
    },
    token,
  });
};

// User login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.generateToken();
  console.log(token);

  user.password = undefined;

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName, staffId, gender, department, password } =
    req.body;

  if (!email || !firstName || !lastName || !staffId || !gender || !department) {
    throw new BadRequestError("Please provide all values");
  }

  // Find the user by ID
  const user = await User.findByPk(req.user.userId);

  if (!user) {
    throw new NotFoundError("User not Found");
  }

  // Update user details

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.staffId = staffId || user.staffId;
  user.gender = gender || user.gender;
  user.department = department || user.department;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  await user.save();

  const token = user.generateToken();

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      staffId: user.staffId,
      gender: user.gender,
      department: user.department,
    },
  });
};

const getUserDetails = async (req, res) => {
  const userId = req.user.userId;

  console.log(userId);
  const user = await User.findByPk(userId);

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      staffId: user.staffId,
      gender: user.gender,
      department: user.department,
    },
  });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

export { registerUser, loginUser, logoutUser, getUserDetails, updateUser };
