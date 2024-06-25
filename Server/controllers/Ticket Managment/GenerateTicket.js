const TicketModel = require("../../models/Ticket");
const TicketModelValidation = require("../../validation/TicketModelValidation");
const Notification = require("../../models/Notification");
const Employee = require("../../models/Employees");

// Controller function to generate a ticket
const GenerateTicket = async (req, res) => {
  try {
    // Get user ID from the decoded token
    const userID = req.user.userId;
    const role = req.user.role;

    if (role !== "user") {
      return res.status(403).json({
        message: "You are not a user. You are not allowed to generate a ticket.",
      });
    }

    // Validate the ticket data
    const { error } = TicketModelValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, priority, attachment } = req.body;

    // Create the ticket
    const newTicket = new TicketModel({
      userID,
      title,
      description,
      priority,
      attachment,
    });

    await newTicket.save();

    // Fetch all admins
    const admins = await Employee.find({ role: "admin" });

    // Create notifications for each admin
    const notifications = admins.map((admin) => ({
      message: "New ticket uploaded by user",
      userId: admin._id,
      role: "admin",
      ticketId: newTicket._id,
    }));

    // Create notification for the user
    const notificationForUser = new Notification({
      message: "Your ticket has been raised, We will see it!",
      userId: userID,
      role: "user",
      ticketId: newTicket._id,
    });

    // Save notifications
    await Notification.insertMany(notifications);
    await notificationForUser.save();

    const io = req.io;

    // Emit notifications to each admin
    admins.forEach((admin) => {
      io.to(admin._id.toString()).emit(
        "notification",
        notifications.find((notif) => notif.userId.equals(admin._id))
      );
    });

    // Emit notification to the user
    io.to(userID.toString()).emit("notification", notificationForUser);

    res.status(201).json({
      message: "Ticket generated successfully",
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating ticket",
      error: error.message,
    });
  }
};

module.exports = { GenerateTicket };
