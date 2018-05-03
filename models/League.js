const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// League Schema
const LeagueSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true,
    max: 5
  },
  seasonType: {
    type: String,
    required: true
  },
  roster: [
    {
      _id: false,
      player: {
        type: Schema.Types.ObjectId,
        ref: "players",
        index: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = League = mongoose.model("leagues", LeagueSchema);
