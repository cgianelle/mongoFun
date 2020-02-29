// const {MongoClient} = require('mongodb');/
const config = require('config');
const {mongo:{url, database, collection} = {}} = config;
const {connectToMongo, createDBHandler} = require('./lib/mongo');
// const mongodb = require('mongodb');

const connectionURL = url + "/" + database;

var client;



async function filterShowsOver60MinutesByEndedStatus() {
    client = await connectToMongo(connectionURL);
    const db = createDBHandler(client);
    return db.collection(collection).aggregate([
        {$match: {runtime: {$gte: 60}}},
        {$match: {status: {$eq: "Ended"}}},
        {$project: {name: 1, _id:0}}
    ]);
}

filterShowsOver60MinutesByEndedStatus().then(cursor => {
    while (cursor.hasNext()) {
        cursor.next((err, result) => {
            if (err) {
                console.log(err);
                client.close();
            }
            console.log(result);
        });
    };
    client.close()
}).catch(err => {
    console.log(err);
});
