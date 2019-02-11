const mongoose = require("mongoose");
const { Schema } = mongoose;

const { trimSchemaStrings } = require("../lib/helpers");

exports.AddressSchema = new Schema(
  trimSchemaStrings({
    street: String,
    city: String,
    post_code: String
  }),
  { _id: false }
);
