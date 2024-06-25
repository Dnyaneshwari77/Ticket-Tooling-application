const TicketModel = require("../../models/Ticket");


const GetTicketOfCurrentUser = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.userId;
   
    const allTickets = await TicketModel.find({userID:userId});

    res.status(201).json({tickets:  allTickets});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error geting  ticket", error: error.message });
  }
};

module.exports = { GetTicketOfCurrentUser };
