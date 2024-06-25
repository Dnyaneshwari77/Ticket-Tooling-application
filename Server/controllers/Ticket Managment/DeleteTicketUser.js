const TicketModel = require("../../models/Ticket");
const EmployeeModel = require("../../models/Employees");

const DeleteTicketUser = async (req, res) => {
  try {
    const { tickedID } = req.params;
    const { userId, role } = req.user;

    console.log(tickedID);

    console.log(req.user);

    let deletedTicket;

    if (role === "user") {
      const ticket = await TicketModel.findOne({
        _id: tickedID,
        userID: userId,
      });
      if (!ticket) {
        return res
          .status(404)
          .json({ message: "Ticket not found or you are not authorized" });
      }
      deletedTicket = await TicketModel.deleteOne({ _id: tickedID });
    } else if (role === "employee") {
      const employee = await EmployeeModel.findOne({ _id: userId });
      if (!employee || !employee.assignedTickets.includes(tickedID)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this ticket" });
      }

      employee.assignedTickets = employee.assignedTickets.filter(
        (ticketid) => ticketid !== tickedID
      );
      await employee.save();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    res
      .status(200)
      .json({ message: "Ticket deleted successfully", deletedTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting ticket", error: error.message });
  }
};

module.exports = { DeleteTicketUser };
