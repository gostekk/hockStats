const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRosterInput(body, params) {
  let errors = {};

  params.league = !isEmpty(params.league_id) ? params.league_id : "";
  body.player = !isEmpty(body.player) ? body.player : "";

  if (!Validator.isMongoId(body.player)) {
    errors.player = "Player ID is invalid";
  }

  if (Validator.isEmpty(body.player)) {
    errors.player = "Player is required";
  }

  if (!Validator.isMongoId(params.league)) {
    errors.league = "League ID is invalid";
  }

  if (Validator.isEmpty(params.league)) {
    errors.league = "League is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
