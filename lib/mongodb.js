// Importing the MongoClient class from the MongoDB library to enable database connections.
const { MongoClient } = require("mongodb");

// The relative path is adjusted to ensure it points to the correct location of the configuration file.
const configurations = require("../configs/global.js");

const client = new MongoClient(configurations.ConnectionStrings.MongoDB);

const clientPromise = client.connect();
module.exports = clientPromise;
