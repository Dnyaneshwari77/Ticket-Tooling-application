const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/Authorization");
const {
  GenerateTicket,
} = require("../../controllers/Ticket Managment/GenerateTicket");
const {
  GetAllTickets,
} = require("../../controllers/Ticket Managment/GetAllTickets");
const {
  GetTicketById,
} = require("../../controllers/Ticket Managment/GetTicketById");
const {
  DeleteTicketUser,
} = require("../../controllers/Ticket Managment/DeleteTicketUser");
const {
  GetTicketOfCurrentUser,
} = require("../../controllers/Ticket Managment/GetTicketOfCurrentUser");
const {
  GetAllPendingTickets,
} = require("../../controllers/Ticket Managment/GetAllPendingTickets");

// Route to generate a ticket
router.post("/create", verifyToken, (req, res) => GenerateTicket(req, res));
router.get("/yourTickets", verifyToken, (req, res) =>
  GetTicketOfCurrentUser(req, res)
);
router.get("/pending", verifyToken, (req, res) =>
  GetAllPendingTickets(req, res)
);
router.get("/:tickedID", verifyToken, (req, res) => GetTicketById(req, res));
router.delete("/:tickedID", verifyToken, (req, res) =>
  DeleteTicketUser(req, res)
);

router.get("/", verifyToken, (req, res) => GetAllTickets(req, res));

module.exports = router;
