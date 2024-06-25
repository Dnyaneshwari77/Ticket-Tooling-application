const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const { type } = require("../validation/TicketModelValidation");


const employeeSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   
    department: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    assignedTickets: {
      type: [String], 
      default: []
    },
    role: {
        type: String,
        default:"employee",
        enum: ["user", "admin", "employee"],
      },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    avaibality:{
      type:String,
      default:"available",
      enum:["available","busy"]
    }
  });

  
  const EmployeeModel = mongoose.model('Employees', employeeSchema);
  
  module.exports = EmployeeModel;
  