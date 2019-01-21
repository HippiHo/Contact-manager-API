const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const contactsRouter = require("./routes/contacts");

const app = express();

/**
 * Connect to DB
 */
mongoose.connect(
  "mongodb://localhost:27017/content-manager-api",
  {
    useNewUrlParser: true
  }
);

// eslint-disable-next-line no-console
mongoose.connection.on("error", console.error);

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/contacts", contactsRouter);

module.exports = app;
