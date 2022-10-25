import mongoose from "mongoose";

export const Quotes = mongoose.model("quote", new mongoose.Schema({
  quote: {type: String, required: true},
  teacher: {type: String, required: true},
  author: {type: String, required: true},
  time: {type: Number, required: true},
  likes: {type: Number, required: false, default: 0},
}));

export const Log = mongoose.model("log", new mongoose.Schema({
  channel: {type: String, required: true},
  guild: {type: String, required: true},
}));
