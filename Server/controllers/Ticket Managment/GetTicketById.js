const TicketModel = require("../../models/Ticket");
const TicketModelValidation = require("../../validation/TicketModelValidation");


const GetTicketById = async (req, res) => {
  try {
    const tickedID = req.params.tickedID;
    console.log(req.params)
    console.log(tickedID);

    console.log(req.user);
    const userId = req.user.userId;
    const role = req.user.role;

    const tickets = await TicketModel.findOne({ _id: tickedID });
    console.log(tickets);

    if (
      tickets &&
      (tickets.userID == userId || role == "admin" || role == "employee")
    ) {
      res.status(201).json({ tickets: tickets });
    } else {
      res.status(201).json({ message: "Ticket not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error geting  ticket", error: error.message });
  }
};

module.exports = { GetTicketById };
