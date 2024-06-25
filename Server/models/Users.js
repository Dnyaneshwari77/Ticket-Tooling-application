const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate:String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Email format is invalid.",
    },
  },
  role: {
    type: String,
    default:"user",
    enum: ["user", "admin", "employee"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
