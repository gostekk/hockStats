const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLocationInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  if (!Validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Location name must be at least 4 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Location name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
