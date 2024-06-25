const TicketModel = require("../../models/Ticket");
const TicketModelValidation = require("../../validation/TicketModelValidation");

// Controller function to generate a ticket
const GetAllTickets = async (req, res) => {
  try {
    console.log(req.user);
    const role = req.user.role;
    
    if (role != "admin" ) {
      res.status(402).json({
        message: "You are not admin, You are not allow to see all ticket",
      });
    }

    const allTickets = await TicketModel.find();

    res.status(201).json({tickets:  allTickets});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error geting  ticket", error: error.message });
  }
};

module.exports = { GetAllTickets };
