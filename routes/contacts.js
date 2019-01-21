const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");

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
  .post(addContact);

router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
