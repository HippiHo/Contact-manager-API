const mongoose = require("mongoose");
const faker = require("faker");

const Person = require("../model/Person");

(async function() {
  mongoose.connect(
    "mongodb://localhost:27017/contact-manager-api",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  mongoose.connection.on("error", console.error);

  try {
    await Person.deleteMany({});
    console.log("Persons purged");
  } catch (err) {
    console.error(err);
  }

  const personPromises = Array(3)
    .fill(null)
    .map(() => {
      const person = new Person({
        name: {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName()
        },
        birthday: faker.date.past(),
        relationship: faker.lorem.paragraphs(1)
      });

      return person.save();
    });

  try {
    await Promise.all(personPromises);
    console.log("Persons seeded");
  } catch (e) {
    console.error(e);
  }

  mongoose.connection.close();
})();
