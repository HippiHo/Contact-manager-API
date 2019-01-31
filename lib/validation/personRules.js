const { check } = require("express-validator/check");

exports.personId = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Person Id")
];

exports.newPerson = [
  check("name.name_prefix")
    .isString()
    .withMessage("A prefix must be formatted as a string")
    .trim()
    .optional(),
  check("name.first_name")
    .isString()
    .withMessage("A first name must be formatted as a string")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  check("name.last_name")
    .isString()
    .withMessage("A last name must be formatted as a string")
    .trim()
    .optional(),
  check("birthday")
    .isString()
    .isISO8601()
    .withMessage("Please provide a valid date: format yyyy-mm-dd")
    .trim()
    .optional(),
  check("relationship")
    .isString()
    .withMessage("The relationship must be formatted as a string")
    .trim()
    .optional()
];

exports.updatedPerson = [
  check("name.name_prefix")
    .isString()
    .withMessage("A prefix must be formatted as a string")
    .trim()
    .optional(),
  check("name.first_name")
    .isString()
    .withMessage("A first name must be formatted as a string")
    .trim()
    .optional(),
  check("name.last_name")
    .isString()
    .withMessage("A last name must be formatted as a string")
    .trim()
    .optional(),
  check("birthday")
    .isString()
    .isISO8601()
    .withMessage("Please provide a valid date: format yyyy-mm-dd")
    .trim()
    .optional(),
  check("relationship")
    .isString()
    .withMessage("The relationship must be formatted as a string")
    .trim()
    .optional()
];
