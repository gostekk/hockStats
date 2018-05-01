const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Player Schema
const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  birthday: {
    type: Date,
    optional: true
  },
  position: {
    type: String,
    optional: true
  },
  jerseyNumber: {
    type: Number,
    optional: true,
    min: 0,
    max: 99
  },
  joinDate: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Player = mongoose.model("players", PlayerSchema);
