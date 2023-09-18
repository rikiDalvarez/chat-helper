import mongoose from "mongoose";
import { GameType } from "../../domain/Player";
import { v4 as uuidv4 } from "uuid";

export const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
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
    required: true,
  },
  successRate: {
    type: Number,
    required: true,
  },
  games: {
    type: Array<GameType>,
    required: true,
  },
});
