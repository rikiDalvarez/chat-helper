import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const roomSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [messageSchema],
});

export const userSchema = new mongoose.Schema({
  name: {
    type: String || null,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: function (value: string) {
      const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  rooms: [roomSchema],
});
