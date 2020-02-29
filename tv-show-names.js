const {MongoClient} = require('mongodb');
const config = require('config');
const {mongo:{url, database, collection} = {}} = config;
const {connectToMongo, createDBHandler} = require('./lib/mongo');

const connectionURL = url + "/" + database;

var client;

async function readTVShowNames() {
    client = await connectToMongo(connectionURL);
    const db = createDBHandler(client);
    return db.collection(collection).find({}).project({'name':1, '_id': 0}).batchSize(200);
}

readTVShowNames().then(cursor => {
    // cursor.forEach(
    //     doc => {
    //         let {name} = doc;
    //         console.log(name);
    //     },
    //     err => {
    //         client.close();
    //     }
    // );
    while (cursor.hasNext()) {
        cursor.next((err, result) => {
            if (err) {
                console.log(err);
                client.close();
            }
            console.log(result);
        });
    }
})
.catch(err => {
    console.log(err);
});