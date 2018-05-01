const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTeamInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.level = !isEmpty(data.level) ? data.level : "";
  data.defHomeUniform = !isEmpty(data.defHomeUniform)
    ? data.defHomeUniform
    : "";
  data.defAwayUniform = !isEmpty(data.defAwayUniform)
    ? data.defAwayUniform
    : "";

  if (!Validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be at least 4 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.level)) {
    errors.level = "Level field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
