const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Game Schema
const GameSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "leagues",
    required: true
  },
  opponent: {
    type: Schema.Types.ObjectId,
    ref: "opponents",
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "locations",
    required: true
  },
  gameType: {
    type: String
  },
  gameDate: {
    type: Date
  },
  uniform: {
    type: String
  },
  notes: {
    type: String
  },
  extraLabel: {
    type: String
  },
  results: {
    goalsFor: {
      type: Number
    },
    goalsAgainst: {
      type: Number
    },
    overtime: {
      type: Boolean
    },
    shootout: {
      type: Boolean
    },
    shootoutGoalsFor: {
      type: Number
    },
    shootoutGoalsAgainst: {
      type: Number
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Game = mongoose.model("games", GameSchema);
