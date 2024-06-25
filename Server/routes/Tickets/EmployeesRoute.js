const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/Authorization");

const {
  GetAllEmployees,
} = require("../../controllers/Ticket Managment/GetAllEmployees");
const {
  AssignTicketToEmployee,
} = require("../../controllers/Ticket Managment/AssignTicketToEmployee");
const {
  GetEmployee,
} = require("../../controllers/Ticket Managment/GetEmployee");
const {
  GetTicketOfCurrentUser,
} = require("../../controllers/Ticket Managment/GetTicketOfCurrentUser");
const {
  GetEmployeeAssignTickets,
} = require("../../controllers/Ticket Managment/GetEmployeeAssignTickets");
const {
  UpdateTicketStatus,
} = require("../../controllers/Ticket Managment/UpdateTicketStatus");
const {
  RemoveAssignedTicket,
} = require("../../controllers/Ticket Managment/DeleteTicketFromEmployeeSide");
const {
  UpdateAvailability,
} = require("../../controllers/Ticket Managment/UpdateAvaiability");

router.get("/", verifyToken, GetAllEmployees);
router.get("/yourtickes", verifyToken, GetEmployeeAssignTickets);
router.post("/avaiability", verifyToken, UpdateAvailability);
router.post("/yourtickes", verifyToken, UpdateTicketStatus);

// router.post("/yourtickes/del", verifyToken, RemoveAssignedTicket); need to think
router.get("/:id", verifyToken, GetEmployee);
router.post("/assign", verifyToken, AssignTicketToEmployee);

module.exports = router;
