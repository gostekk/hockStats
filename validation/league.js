const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLeagueInput(data) {
  let errors = {};

  data.team = !isEmpty(data.team) ? data.team : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.shortName = !isEmpty(data.shortName) ? data.shortName : "";
  data.seasonType = !isEmpty(data.seasonType) ? data.seasonType : "";

  if (!Validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "League name must be at least 4 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "League name is required";
  }

  if (Validator.isUUID(data.team)) {
    errors.team = "Team ID is invalid";
  }

  if (Validator.isEmpty(data.team)) {
    errors.team = "Team is required";
  }

  if (Validator.isEmpty(data.seasonType)) {
    errors.seasonType = "League type is required";
  }

  if (!Validator.isLength(data.shortName, { max: 5 })) {
    errors.shortName = "League short name must be at most 5 characters";
  }

  if (Validator.isEmpty(data.shortName)) {
    errors.shortName = "League shortName is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
