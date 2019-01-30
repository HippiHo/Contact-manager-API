const mongoose = require("mongoose");
const { Schema } = mongoose;

const { trimSchemaStrings } = require("../lib/helpers");

exports.PhoneSchema = new Schema(
  trimSchemaStrings({
    mobile: {
      type: String,
      required: true
    },
    private: String,
    business: String
  }),
  { _id: false }
);
