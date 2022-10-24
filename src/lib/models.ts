import mongoose from "mongoose";

export const Quotes = mongoose.model("quote", new mongoose.Schema({
  quote: {type: String, required: true},
  teacher: {type: String, required: true},
  author: {type: String, required: true},
  time: {type: Number, required: true},
  likes: {type: Number, required: false, default: 0},
}));
