const EmployeeModel = require("../../models/Employees");


const GetEmployee = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log(req.params)

    const id=req.params.id;
    console.log(id);
    const role = req.user.role;

    if (role != "admin") {
      res.status(402).json({
        message: "You are not admin, You are not allow to see all employees",
      });
    }

    const Employee = await EmployeeModel.findOne({ _id: id });

    res.status(201).json({ employee: Employee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting employee", error: error.message });
  }
};

module.exports = { GetEmployee };
