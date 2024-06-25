const TicketModel = require("../../models/Ticket");
const EmployeeModel = require("../../models/Employees");
const Notification = require("../../models/Notification");
const UserModel = require("../../models/Users");

const UpdateTicketStatus = async (req, res) => {
  try {
    const { ticket_id, status } = req.body;
    const { userId, role } = req.user;

    if (role !== "employee") {
      return res.status(403).json({
        message: "Unauthorized: Only employees can update ticket status",
      });
    }

    const employee = await EmployeeModel.findOne({ _id: userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (!employee.assignedTickets.includes(ticket_id)) {
      return res.status(403).json({
        message: "Unauthorized: Ticket not assigned to this employee",
      });
    }

    const ticket = await TicketModel.findById(ticket_id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update ticket status
    ticket.Status = status; // Ensure status is case-sensitive

    const updatedTicket = await ticket.save();

    const user = await UserModel.findById(ticket.userID);
    
    const notification = new Notification({
      message: `Your ticket ${ticket.title} has been updated to ${status}`,
      role: "user",
      userId: ticket.userID,
      ticketId: ticket._id,
    });

    await notification.save();

    const io = req.io;
    io.to(user._id.toString()).emit("notification", notification);

    console.log("Employee Side Notification", notification);

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating ticket status",
      error: error.message,
    });
  }
};

module.exports = { UpdateTicketStatus };
