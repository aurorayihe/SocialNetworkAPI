const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
  getRandomName,
  getRandomThoughts,
} = require('./data');

connection.on('error', (err) => err);



// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Add randomly generated users to the database
  const users = [];

  for(let i = 0; i < 5; i++) {
    const thoughts = getRandomThoughts(2);

    const username = getRandomName();
    const email = `${username}@gmail.com`;
    users.push({
      username,
      email,
      thoughts,
    })
  };

  await User.collection.insertMany(users);


  // Add randomly generated thoughts to the database
  const thoughts = getRandomThoughts(5);

  await Thought.collection.insertMany(thoughts);


  // Log out a pretty table for users and thoughts
  console.table(users);
  console.table(thoughts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
