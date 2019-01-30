const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const createError = require("http-errors");

const { setCorsHeaders } = require("./middleware/security");

const indexRouter = require("./routes/index");
const contactsRouter = require("./routes/contacts");
const personsRouter = require("./routes/persons");

const { errorMessage } = require("./controllers/messagesController");

const app = express();

/**
 * Connect to DB
 */
mongoose.connect(
  "mongodb://localhost:27017/contact-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

// eslint-disable-next-line no-console
mongoose.connection.on("error", console.error);

app.use(setCorsHeaders);

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/contacts", contactsRouter);
app.use("/persons", personsRouter);

// Catch any unrecognized route and send an error message
app.use((req, res, next) => {
  const error = new createError.NotFound();

  next(error);
});

app.use(errorMessage);

module.exports = app;
