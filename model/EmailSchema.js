const mongoose = require("mongoose");
const { Schema } = mongoose;

const { trimSchemaStrings } = require("../lib/helpers");

exports.EmailSchema = new Schema(
  trimSchemaStrings({
    private: String,
    business: String
  }),
  { _id: false }
);
