import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

// Controller for user registration

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

export { registerUser };
