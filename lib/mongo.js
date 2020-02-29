const {MongoClient} = require('mongodb');

async function connectToMongo(url) {
    let mongo = MongoClient(url, { useUnifiedTopology: true });
    return mongo.connect();
}

function createDBHandler(client) {
    return client.db();
}

exports.connectToMongo = connectToMongo;
exports.createDBHandler = createDBHandler;
