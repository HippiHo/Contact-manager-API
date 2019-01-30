const { cloneDeep } = require("lodash/lang");

/**
 * Takes a mongoose schema definition object and trims all strings, unless specified otherwise
 * @param {Object} schema
 */
// Challenge: Convert the function below to use array methods instead of for ... in
exports.trimSchemaStrings = schema => {
  schema = cloneDeep(schema);

  for (let key in schema) {
    if (schema[key] === String || schema[key].type === String) {
      const stringOptions = { type: String, trim: true };
      schema[key] =
        typeof schema[key] === "object"
          ? Object.assign(stringOptions, schema[key])
          : stringOptions;
    }
  }

  return schema;
};
