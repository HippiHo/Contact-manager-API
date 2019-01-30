const mongoose = require("mongoose");
const { Schema } = mongoose;

const { NameSchema } = require("./NameSchema");

const PersonSchema = new Schema({
  name: {
    type: NameSchema,
    required: true
  },
  birthday: Date,
  relationship: {
    type: String,
    default: "No relationship given"
  }
});

module.exports = mongoose.model("Person", PersonSchema);
