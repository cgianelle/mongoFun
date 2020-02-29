const util = require('util');
const config = require('config');
const {MongoClient} = require('mongodb');
const {mongo:{url, database, collection} = {}} = config;
const {connectToMongo, createDBHandler} = require('./lib/mongo');

const tvshows = require('./tv-shows.json');

const connectionURL = url + "/" + database;

var client;

async function seedDatabase(data) {
    client = await connectToMongo(connectionURL);
    const db = createDBHandler(client);
    return db.collection(collection).insertMany(data);
}

seedDatabase(tvshows).then(result => {
    console.log(result);
    client.close();
})
.catch(err => {
    console.log(err);
});


