const Contact = require("../model/Contact");

exports.listContacts = async (req, res) => {
  try {
    res.json(await Contact.find());
  } catch (e) {
    console.error(e);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (e) {
    // console.dir(e);
    if (e.name === "ValidationError") {
      e.statusCode = 422;
      next(e);
    } else {
      throw e;
    }
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) throw new Error("Not found");

    res.json(contact);
  } catch (e) {
    if (
      (e.name === "CastError" && e.path === "_id") ||
      e.message === "Not found"
    ) {
      e.statusCode = 404;
      e.message = "Contact not found";
      next(e);
    } else {
      throw e;
    }
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
    // console.dir(e);
    if (e.name === "ValidationError") {
      e.statusCode = 422;
      next(e);
    } else if (
      (e.name === "CastError" && e.path === "_id") ||
      e.reason.name === "ObjectParameterError"
    ) {
      e.statusCode = 404;
      e.message = "Contact not found";
      next(e);
    } else if (e.name === "CastError") {
      next(e);
    } else {
      throw e;
    }
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) throw new Error("Not found");
    // wrong id
    res.json(contact);
  } catch (e) {
    if (e.message === "Not found") {
      // book already deleted
      e.statusCode = 404;
      e.message = "Contact already deleted.";
      next(e);
    } else if (e.name === "CastError" && e.kind === "ObjectId") {
      // not selected by ID
      e.statusCode = 404;
      e.message = "Please select by ID";
      next(e);
    } else {
      console.error(e);
    }
  }
};
