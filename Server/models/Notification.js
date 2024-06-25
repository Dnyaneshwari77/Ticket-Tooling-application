const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
  userId: String,
  role: String,
  ticketId: String,
  status: { type: String, default: "unread" },
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
