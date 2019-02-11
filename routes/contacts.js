const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");

const { validateInputs } = require("../middleware/validation");
const { newContact, contactId } = require("../lib/validation/contactRules");

const {
  listContacts,
  addContact,
  getContact,
  updateContact,
  deleteContact
} = require("../controllers/contactsControllers");

router
  .route("/")
  .get(listContacts)
  .post(validateInputs(newContact), addContact);

router
  .route("/:id")
  .all(validateInputs(contactId))
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
