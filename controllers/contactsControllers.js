const Contact = require("../model/Contact");

exports.listContacts = async (req, res) => {
  res.json(await Contact.find());
};

exports.addContact = (req, res) => {
  res.send("add a contact");
};

exports.getContact = (req, res) => {
  res.send("get a contact");
};

exports.updateContact = (req, res) => {
  res.send("update contact");
};

exports.deleteContact = (req, res) => {
  res.send("delete contact");
};
