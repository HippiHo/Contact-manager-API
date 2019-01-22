const mongoose = require("mongoose");

const { Schema } = mongoose;

const { LANGUAGES } = require("../lib/constants");

const trimmedString = options => ({
  type: String,
  trim: true,
  ...options
});

const NameSchema = new Schema(
  {
    name_prefix: trimmedString(),
    first_name: trimmedString({ required: true }),
    last_name: trimmedString()
  },
  { _id: false }
);

const PhoneSchema = new Schema(
  {
    mobile: {
      type: String,
      required: true
    },
    private: String,
    business: String
  },
  { _id: false }
);

const EmailSchema = new Schema(
  {
    private: String,
    business: String
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    post_code: Number
  },
  { _id: false }
);

const contactSchema = new Schema({
  name: NameSchema,
  organisation: trimmedString(),
  phone_number: PhoneSchema,
  email: EmailSchema,
  address: AddressSchema,
  website: String,
  birthday: Date,
  relationship: String,
  languages: {
    type: String,
    required: true,
    enum: LANGUAGES
  },
  first_location: String
});

module.exports = mongoose.model("Contact", contactSchema);
