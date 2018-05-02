const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Location Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    optional: true
  },
  notes: {
    type: String,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Location = mongoose.model("locations", LocationSchema);
