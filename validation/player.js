const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePlayerInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
  data.jerseyNumber = !isEmpty(data.jerseyNumber) ? data.jerseyNumber : "";
  data.position = !isEmpty(data.position) ? data.position : "";
  data.joinDate = !isEmpty(data.joinDate) ? data.joinDate : "";

  if (!Validator.isLength(data.firstName, { min: 3, max: 30 })) {
    errors.firstName = "First name must be at least 3 characters";
  }

  if (!Validator.isLength(data.lastName, { min: 3, max: 30 })) {
    errors.lastName = "Last name must be at least 3 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (
    data.jerseyNumber &&
    !Validator.isInt(data.jerseyNumber, { min: 0, max: 99 })
  ) {
    errors.jerseyNumber = "Jersey Number must be number";
  }

  if (data.birthday && !Validator.toDate(data.birthday)) {
    errors.birthday = "Birthday must be date format";
  }

  if (data.joinDate && !Validator.toDate(data.joinDate)) {
    errors.joinDate = "Join date must be date format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
