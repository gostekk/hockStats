const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOpponentInput(data) {
  let errors = {};

  data.team = !isEmpty(data.team) ? data.team : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.contactName = !isEmpty(data.contactName) ? data.contactName : "";
  data.contactPhone = !isEmpty(data.contactPhone) ? data.contactPhone : "";
  data.contactEmail = !isEmpty(data.contactEmail) ? data.contactEmail : "";
  data.homeUniform = !isEmpty(data.homeUniform) ? data.homeUniform : "";
  data.awayUniform = !isEmpty(data.awayUniform) ? data.awayUniform : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  if (!Validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Opponent name must be at least 4 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Opponent name is required";
  }

  if (Validator.isUUID(data.team)) {
    errors.team = "Team ID is invalid";
  }

  if (Validator.isEmpty(data.team)) {
    errors.team = "Team is required";
  }

  if (data.contactPhone && !Validator.isMobilePhone(data.contactPhone, "any")) {
    errors.contactPhone = "Contact phone is invalid";
  }

  if (data.contactEmail && !Validator.isEmail(data.contactEmail)) {
    errors.contactEmail = "Contact email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
