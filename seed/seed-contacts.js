/* eslint no-console: 0 */
const faker = require("faker");
const mongoose = require("mongoose");

const Contact = require("../model/Contact");
const { LANGUAGES } = require("../lib/constants");

async function seedContacts() {
  mongoose.connect(
    "mongodb://localhost:27017/content-manager-api",
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

  const contactPromises = Array(15)
    .fill(null)
    .map(() => {
      const contact = new Contact({
        name: {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName()
        },
        phone: {
          mobile: faker.phone.phoneNumber()
        },
        birthday: faker.date.past(),
        languages: faker.random.arrayElement(LANGUAGES),
        first_location: faker.lorem.sentence()
      });

      return contact.save();
    });

  try {
    await Promise.all(contactPromises);
    console.log("Contacts seeded!");
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
}

seedContacts();
