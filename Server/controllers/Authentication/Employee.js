const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const EmployeeModel = require("../../models/Employees");
const EmployeeModelValidationSchema = require("../../validation/EmployeeModelValidation");
const { use } = require("../../routes/Authentication/UserRoutes");

const registerEmployee = async (req, res) => {
  try {
    // Validate request body
    const { error } = EmployeeModelValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, email, department, position, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the employee

    let newEmployee;
    if (role) {
      newEmployee = new EmployeeModel({
        username,
        password: hashedPassword,
        email,
        department,
        position,
        role,
        assignedTicket: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      newEmployee = new EmployeeModel({
        username,
        password: hashedPassword,
        email,
        department,
        position,
        assignedTicket: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Save the employee to the database
    await newEmployee.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newEmployee._id,
        email: newEmployee.email,
        role: newEmployee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.status(201).json({ token: token, role: newEmployee.role ,avaibility:newEmployee.avaibality});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering employee", error: error.message });
  }
};

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await EmployeeModel.findOne({
      email,
    });

    if (!employee) {
      return res.status(401).json({ message: "Invalid employee credentials" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid employee credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: employee._id, email: employee.email, role: employee.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.status(201).json({ token: token, role: employee.role , avaibality:employee.avaibality});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in employee", error: error.message });
  }
};

module.exports = { registerEmployee, loginEmployee };
