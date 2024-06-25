const EmployeeModel = require("../../models/Employees");

// Controller function to generate a ticket
const GetAllEmployees = async (req, res) => {
  try {
    console.log(req.user);
    const role = req.user.role;

    if (role != "admin") {
      res.status(402).json({
        message: "You are not admin, You are not allow to see all employees",
      });
    }

    const allEmployees = await EmployeeModel.find({ role: "employee" });

    res.status(201).json({ employees: allEmployees });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error geting  employees", error: error.message });
  }
};

module.exports = { GetAllEmployees };
