const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Opponent Schema
const OpponentSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "teams"
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    name: {
      type: String,
      optional: true
    },
    phone: {
      type: String,
      optional: true
    },
    email: {
      type: String,
      optional: true
    }
  },
  homeUniform: {
    type: String,
    optional: true
  },
  awayUniform: {
    type: String,
    optional: true
  },
  notes: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Opponent = mongoose.model("opponents", OpponentSchema);
