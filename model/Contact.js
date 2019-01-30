const mongoose = require("mongoose");

const { Schema } = mongoose;

const { NameSchema } = require("./NameSchema");
const { PhoneSchema } = require("./PhoneSchema");
const { EmailSchema } = require("./EmailSchema");
const { AddressSchema } = require("./AddressSchema");
const { LANGUAGES } = require("../lib/constants");
const { trimSchemaStrings } = require("../lib/helpers");

const contactSchema = new Schema(
  trimSchemaStrings({
    person: {
      type: Schema.Types.ObjectId,
      ref: "Person"
    },
    organisation: String,
    phone_number: {
      type: PhoneSchema,
      required: true
    },
    email: EmailSchema,
    address: AddressSchema,
    languages: [
      {
        type: String,
        required: true,
        enum: LANGUAGES
      }
    ]
  })
);

module.exports = mongoose.model("Contact", contactSchema);
