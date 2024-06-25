const EmployeeModel = require("../../models/Employees");
const TicketModel = require("../../models/Ticket");
const Notification = require("../../models/Notification");

const AssignTicketToEmployee = async (req, res) => {
  try {
    const { ticket_id, employee_id } = req.body;
    const role = req.user.role;

    console.log("Request come");

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    // Find the employee by ID
    const employee = await EmployeeModel.findById(employee_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the ticket by ID to ensure it exists
    const ticket = await TicketModel.findById(ticket_id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (!Array.isArray(employee.assignedTickets)) {
      employee.assignedTickets = [];
    }

    // Append the ticket_id to the assignedTickets field
    if (!employee.assignedTickets.includes(ticket_id)) {
      employee.assignedTickets.push(ticket_id);
      await employee.save();

      ticket.assigned = true;
      ticket.empID = employee_id;
      await ticket.save();

      // Create and save notification to the database
      const notification = new Notification({
        message: "You have been assigned a new ticket",
        role: "employee",
        userId: employee._id,
        ticketId: ticket._id,
      });

      await notification.save();

      // Emit notification to the specific employee
      const io = req.io;
      io.to(employee._id.toString()).emit("notification", notification);

      console.log("Employee Side Notification", notification);
    }

    res.status(200).json({ message: "Ticket assigned successfully", employee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error assigning ticket", error: error.message });
  }
};

module.exports = { AssignTicketToEmployee };
