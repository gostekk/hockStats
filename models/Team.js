const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Team Schema
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  defHomeUniform: {
    type: String,
    optional: true
  },
  defAwayUniform: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);
