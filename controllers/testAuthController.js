const User = require("../models/user");

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstname, lastname, staffId, gender, department, email, password } =
    req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with the provided email already exists" });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      staffId,
      gender,
      department,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    const user = await User.findOne({ where: { staffId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = user.generateToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { firstname, lastname, staffId, gender, department, email, password } =
    req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.staffId = staffId || user.staffId;
    user.gender = gender || user.gender;
    user.department = department || user.department;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user details" });
  }
};
