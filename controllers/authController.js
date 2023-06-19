import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
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

  console.log(req.body);

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

  user.password = undefined;

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
  });
};

export { registerUser, loginUser };
