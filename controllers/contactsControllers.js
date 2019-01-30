/**
 * Note on error handling:
 * From now on we are going to treat any mongoose error as a 500.
 * To actually take care of validating user input,
 * we will use another library called express-validator for validation and we will
 * format our errors with http-errors
 * express-validator: https://express-validator.github.io/docs/
 * http-errors: https://github.com/jshttp/http-errors#http-errors
 */

const createError = require("http-errors");

const Contact = require("../model/Contact");
const Person = require("../model/Person");

exports.listContacts = async (req, res, next) => {
  try {
    let query = null;
    if (req.query.person) {
      query = { person: req.query.person };
    }
    const contact = await Contact.find(query).populate({
      path: "person",
      select: "name"
    });
    console.log("contact", contact);
    if (contact.length === 0) throw new createError.NotFound();
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) throw new createError.NotFound();
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    res.json(contact);
  } catch (e) {
    next(e);
  }
};
