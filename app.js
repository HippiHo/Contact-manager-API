const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const contactsRouter = require("./routes/contacts");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
