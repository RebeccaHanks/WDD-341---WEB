const { MongoClient } = require('mongodb');


const client = new MongoClient("mongodb+srv://userRH:RLHanks123987@cluster0.c4kwsbu.mongodb.net/?appName=Cluster0");

let database;

async function connectToDatabase() {
    await client.connect();
    database = client.db("wdd341");
    console.log("Connected to MongoDB");
}

function getDatabase() {
    return database;
}

module.exports = {
    connectToDatabase,
    getDatabase
};