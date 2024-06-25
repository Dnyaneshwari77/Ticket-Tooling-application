const TicketModel = require("../../models/Ticket");
const EmployeeModel = require("../../models/Employees");

const GetEmployeeAssignTickets = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.userId;
    const role=req.user.role;

    const employee = await EmployeeModel.findOne({ _id: userId });

    if (!employee || role!="employee") {
      return res.status(404).json({ message: "You are not employee you are not all to do this" });
    }

    const assignedTickets = employee.assignedTickets;

    const tickets = await TicketModel.find({ _id: { $in: assignedTickets } });

    res.status(200).json({ tickets: tickets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting tickets", error: error.message });
  }
};

module.exports = { GetEmployeeAssignTickets };
