const TicketModel = require("../../models/Ticket");
const TicketModelValidation = require("../../validation/TicketModelValidation");

// Not necessary but still there
const DeleteTicketByEmployee = async (req, res) => {
  try {
    console.log(req.user);
    const tickedId = req.params.tickedID;
    const userId = req.user.userId;

    console.log(req.user);

    const Tickets = await TicketModel.findOne({ _id: tickedId });
    let deletedTicket;
    if (Tickets.userID == userId) {
      deletedTicket = await TicketModel.deleteOne({ _id: tickedId });
    } else {
      res.status(201).json({ meassage: "You are not allowed to do this" });
    }

    res.status(201).json({ Deleted: deletedTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting  ticket", error: error.message });
  }
};

module.exports = { DeleteTicketByEmployee };
