const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { prefix: String, first_name: String, last_name: String },
  organisation: String,
  phone_number: { mobile: Number, private: Number, business: Number },
  ringing_tone: String,
  email: { private: String, business: String },
  address: { street: String, city: String, post_code: Number },
  website: String,
  birthday: String,
  relationship: String,
  languages: Array,
  first_location: String
});

module.exports = mongoose.model("Contact", contactSchema);
