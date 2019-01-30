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

//const Contact = require("../model/Contact");
const Person = require("../model/Person");

exports.listPersons = async (req, res, next) => {
  try {
    res.json(await Person.find());
  } catch (e) {
    next(e);
  }
};

exports.addPerson = async (req, res, next) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.json(person);
  } catch (e) {
    next(e);
  }
};

exports.getPerson = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) throw new createError.NotFound();
    res.json(person);
  } catch (e) {
    next(e);
  }
};

exports.updatePerson = async (req, res, next) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(person);
  } catch (e) {
    next(e);
  }
};

exports.deletePerson = async (req, res, next) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    res.json(person);
  } catch (e) {
    next(e);
  }
};
