const express = require("express");

const router = express.Router();

const { validateInputs } = require("../middleware/validation");
const {
  newPerson,
  updatedPerson,
  personId
} = require("../lib/validation/personRules");

const {
  listPersons,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson
} = require("../controllers/personsController");

router
  .route("/")
  .get(listPersons)
  .post(validateInputs(newPerson), addPerson);

router
  .route("/:id")
  .all(validateInputs(personId, updatedPerson))
  .get(getPerson)
  .put(updatePerson)
  .delete(deletePerson);

module.exports = router;
