/* eslint no-console: 0 */
const faker = require("faker");
const mongoose = require("mongoose");

const Contact = require("../model/Contact");
const { LANGUAGES } = require("../lib/constants");

(async function seedContacts() {
  mongoose.connect("mongodb://localhost:27017/contact-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  mongoose.connection.on("error", console.error);

  try {
    await Contact.deleteMany({});
    console.log("Contacts purged!");
  } catch (err) {
    console.error(err);
  }

  try {
    const contactPromises = Array(15)
      .fill(null)
      .map(() => {
        const contact = new Contact({
          name: {
            name_prefix: faker.name.prefix(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName()
          },
          birthday: faker.date.past(),
          relationship: faker.hacker.noun(),
          organisation: faker.company.companyName(),
          phone_number: {
            mobile: faker.phone.phoneNumber(),
            private: faker.phone.phoneNumber(),
            business: faker.phone.phoneNumber()
          },
          email: {
            private: faker.internet.email(),
            business: faker.internet.email()
          },
          address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            post_code: faker.address.zipCode()
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
