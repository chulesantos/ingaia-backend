const Middleware = require('./Middleware');
const config = require('./settings');

class Database {

    constructor() {

        try {

            const uri = config.mongodb.development;

            const mongoose = Middleware.mongoose();

            mongoose.Promise = global.Promise;

            mongoose.connect(uri, {useNewUrlParser: true});

            const mongoConnect = mongoose.connection;

            /*   mongoConnect.on('connected', () =>
                   console.log('\n Mongoose! Connected! ' + uri));*/

            /*     mongoConnect.on('disconnected', () =>
                     console.log('\n Mongoose! Disconnected from ' + uri));*/


        } catch (e) {

            mongoConnect.on('error', err =>
                console.log('\n Mongoose! Connection error: ' + err));

        }
    }
}

module.exports = Database;