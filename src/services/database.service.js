require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URL_TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getDbLocations(query = {}) {

  await client.connect();
  const database = client.db("test");
  const collection = database.collection("locations");
  const result = await collection.find(query).toArray();

  await client.close();

  return result;
}

async function getDbEvents(query = {}) {

  await client.connect();
  const database = client.db("test");
  const collection = database.collection("events");
  const result = await collection.find(query).toArray();

  await client.close();

  return result;
}

async function getDbArtists(query = {}) {

  await client.connect();
  const database = client.db("test");
  const collection = database.collection("artists");
  const result = await collection.find(query).toArray();

  await client.close();

  return result;
}

async function getDbUsers(query = {}) {

  await client.connect();
  const database = client.db("test");
  const collection = database.collection("users");
  const result = await collection.find(query).toArray();

  await client.close();

  return result;
}

module.exports = { client, ObjectId, getDbLocations, getDbEvents, getDbArtists, getDbUsers};
