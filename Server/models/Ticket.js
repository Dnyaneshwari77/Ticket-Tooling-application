const mongoose = require("mongoose");
const { type } = require("../validation/TicketModelValidation");
const { bool } = require("joi");

const ticketSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  attachment: {
    type: String,
    required: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  Status:
  {
    type:String,
    default:"Unsolved",
    enum: ['Unsolved', 'Pending', 'Solved'],
  },
  assigned:
  {
    type:Boolean,
    default:false,
  },
  empID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees',
  },
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

module.exports = TicketModel;
