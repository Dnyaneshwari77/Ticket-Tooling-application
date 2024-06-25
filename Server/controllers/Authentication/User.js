const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/Users");
const UserModelValidationSchema = require("../../validation/UserModelValidation");

const registerUser = async (req, res) => {
  try {
    // Validate the request body
    const { error } = UserModelValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Destructure user details from request body
    const { username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      role: "user",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, "role",newUser.role, { httpOnly: true, sameSite: 'strict' });

    res.status(201).json({"token":token,"role":newUser.role });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });

    res.status(201).json({"token":token,"role":user.role });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
