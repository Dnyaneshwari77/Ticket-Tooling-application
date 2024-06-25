const EmployeeModel = require("../../models/Employees");

const RemoveAssignedTicket = async (req, res) => {
  try {
    const  {ticketID } = req.body;
    console.log(ticketID)
    const { userId, role } = req.user;
    // console.log(req.user);

    if (role !== "employee") {
      return res.status(403).json({
        message: "Unauthorized: Only employees can remove assigned tickets",
      });
    }

    const employee = await EmployeeModel.findOne({ _id: userId });
    // console.log(employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const ticketIdStr = ticketID.toString();
    // Check if the ticket_id is in the employee's assignedTickets array
    if (!employee.assignedTickets.includes(ticketIdStr)) {
      return res
        .status(400)
        .json({ message: "Ticket is not assigned to this employee" });
    }

    // Remove the ticket_id from the employee's assignedTickets array
    employee.assignedTickets = employee.assignedTickets.filter(
      (id) => id !== ticket_id
    );
    await employee.save();

    res.status(200).json({ message: "Ticket assignment removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing ticket assignment",
      error: error.message,
    });
  }
};

module.exports = { RemoveAssignedTicket };
