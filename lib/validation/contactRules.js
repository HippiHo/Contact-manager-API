const { check } = require("express-validator/check");
const { LANGUAGES } = require("../constants");

exports.contactId = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Contact Id")
];

exports.newContact = [
  check("person") // only works when providng mongoIds
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide an author ID")
    .isMongoId()
    .withMessage("Wrong ID provided, Please create an author entry first"),
  check("organisation")
    .isString()
    .withMessage("Organisation must be formatted as a string")
    .trim()
    .optional(),
  check("phone_number.mobile")
    .isString()
    .withMessage("Mobile number must be formatted as a string")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Mobile number is required"),
  check("phone_number.private")
    .isString()
    .withMessage("Private number must be formatted as a string")
    .trim()
    .optional(),
  check("phone_number.business")
    .isString()
    .withMessage("Business number must be formatted as a string")
    .trim()
    .optional(),
  check("email.private")
    .isString()
    .withMessage("Private email must be formatted as a string")
    .trim()
    .optional(),
  check("email.business")
    .isString()
    .withMessage("Business email must be formatted as a string")
    .trim()
    .optional(),
  check("address.street")
    .isString()
    .withMessage("The street must be formatted as a string")
    .trim()
    .optional(),
  check("address.city")
    .isString()
    .withMessage("The city be formatted as a string")
    .trim()
    .optional(),
  check("address.post_code")
    .isPostalCode()
    .withMessage("Please provide a valid postal code.")
    .trim()
    .optional(),
  check("languages")
    .isIn(LANGUAGES)
    .withMessage("Only allowed languages")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Language is required")
];

exports.byPerson = [
  check("person")
    .isMongoId()
    .withMessage("Invalid person Id")
    .trim()
    .optional()
];
