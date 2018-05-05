const Validator = require("validator");
const isEmpty = require("./is-empty");

// Load Team model
const Team = require("../models/Team");
// Load League model
const League = require("../models/League");
// Load Opponent model
const Opponent = require("../models/Opponent");
// Load Location model
const Location = require("../models/Location");

module.exports = function validateLeagueInput(data) {
  let errors = {};

  data.team = !isEmpty(data.team) ? data.team : "";
  data.league = !isEmpty(data.league) ? data.league : "";
  data.opponent = !isEmpty(data.opponent) ? data.opponent : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  data.gameType = !isEmpty(data.gameType) ? data.gameType : "";
  data.gameDate = !isEmpty(data.gameDate) ? data.gameDate : "";

  // Result
  if (!isEmpty(data.results)) {
    data.results.goalsFor = !isEmpty(data.results.goalsFor)
      ? data.results.goalsFor
      : "";
    data.results.goalsAgainst = !isEmpty(data.results.goalsAgainst)
      ? data.results.goalsAgainst
      : "";
    data.results.overtime = !isEmpty(data.results.overtime)
      ? data.results.overtime
      : "";
    data.results.shootout = !isEmpty(data.results.shootout)
      ? data.results.shootout
      : "";
    data.results.shootoutGoalsFor = !isEmpty(data.results.shootoutGoalsFor)
      ? data.results.shootoutGoalsFor
      : "";
    data.results.shootoutGoalsAgainst = !isEmpty(
      data.results.shootoutGoalsAgainst
    )
      ? data.results.shootoutGoalsAgainst
      : "";
  }

  // Team
  if (!Validator.isMongoId(data.team)) {
    errors.team = "Team ID is invalid";
  }

  if (Validator.isEmpty(data.team)) {
    errors.team = "Team is required";
  }

  // League
  if (!Validator.isMongoId(data.league)) {
    errors.league = "League ID is invalid";
  }

  if (Validator.isEmpty(data.league)) {
    errors.league = "League is required";
  }

  // Opponent
  if (!Validator.isMongoId(data.opponent)) {
    errors.opponent = "Opponent ID is invalid";
  }

  if (Validator.isEmpty(data.opponent)) {
    errors.opponent = "Opponent is required";
  }

  // Location
  if (!Validator.isMongoId(data.location)) {
    errors.location = "Location ID is invalid";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  // GameType

  // GameDate

  // Results

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
