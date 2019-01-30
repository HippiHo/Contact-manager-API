/* eslint no-console: 0 */
const faker = require("faker");
const mongoose = require("mongoose");

const Person = require("../model/Person");
const Contact = require("../model/Contact");
const { LANGUAGES } = require("../lib/constants");

(async function seedContacts() {
  mongoose.connect(
    "mongodb://localhost:27017/contact-manager-api",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  mongoose.connection.on("error", console.error);

  try {
    await Contact.deleteMany({});
    console.log("Contacts purged!");
  } catch (err) {
    console.error(err);
  }

  try {
    const persons = await Person.find();
    if (persons.length === 0) {
      throw new Error("Cannot find any persons");
    }

    console.log(`Got ${persons.length} persons from the db`);

    const contactPromises = Array(15)
      .fill(null)
      .map(() => {
        const contact = new Contact({
          person: faker.random.arrayElement(persons)._id,
          phone_number: {
            mobile: faker.phone.phoneNumber()
          },
          languages: faker.random.arrayElement(LANGUAGES)
        });

        return contact.save();
      });

    await Promise.all(contactPromises);
    console.log("Contacts seeded!");
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
})();
