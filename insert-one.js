const {MongoClient} = require('mongodb');
const config = require('config');
const {mongo:{url, database, collection} = {}} = config;
const {connectToMongo, createDBHandler} = require('./lib/mongo');

const connectionURL = url + "/" + database;

var client;

const tvshow = {
    "id" : 1000,
    "url" : "http://www.tvmaze.com/shows/76/sons-of-anarchy",
    "name" : "Sons of Anarchy",
    "type" : "Scripted",
    "language" : "English",
    "genres" : [ 
        "Drama"
    ],
    "status" : "Ended",
    "runtime" : 60,
    "premiered" : "2008-09-03",
    "officialSite" : "http://www.cbs.com/shows/under-the-dome/",
    "schedule" : {
        "time" : "22:00",
        "days" : [ 
            "Tuesday"
        ]
    },
    "rating" : {
        "average" : 8.5
    },
    "weight" : 91,
    "network" : {
        "id" : 2,
        "name" : "FX",
        "country" : {
            "name" : "United States",
            "code" : "US",
            "timezone" : "America/New_York"
        }
    },
    "webChannel" : null,
    "externals" : {
        "tvrage" : 25988,
        "thetvdb" : 264492,
        "imdb" : "tt1553656"
    },
    "image" : {
        "medium" : "http://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg",
        "original" : "http://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg"
    },
    "summary" : "<p><b>Sons of Anarchy</b> is an American television drama series created by Kurt Sutter, about the lives of a close-knit outlaw motorcycle club operating in Charming, a fictional town in California's Central Valley. The show centers on protagonist Jackson 'Jax' Teller (Charlie Hunnam), initially the vice president of the club, who begins questioning the club and himself.</p>",
    "updated" : 1529612668,
    "_links" : {
        "self" : {
            "href" : "http://api.tvmaze.com/shows/76"
        },
        "previousepisode" : {
            "href" : "http://api.tvmaze.com/episodes/185054"
        }
    }
};

async function addNewDocument(data) {
    client = await connectToMongo(connectionURL);
    const db = createDBHandler(client);
    return db.collection(collection).insertOne(data);
}

addNewDocument(tvshow).then(result => {
    console.log(result);
    client.close();
})
.catch(err => {
    console.log(err);
});