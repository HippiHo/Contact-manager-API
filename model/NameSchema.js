const mongoose = require("mongoose");
// Destructuring
const { Schema } = mongoose;

const { trimSchemaStrings } = require("../lib/helpers");

exports.NameSchema = new Schema(
  trimSchemaStrings({
    name_prefix: String,
    first_name: {
      type: String,
      required: true
    },
    last_name: String
  }),
  { _id: false }
);
