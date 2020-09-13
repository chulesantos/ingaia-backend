const Middleware = require('./Middleware');
const config = require('./settings');

class Database {

    constructor() {

        const mongoose = Middleware.mongoose();

        mongoose.Promise = global.Promise;

        mongoose.connect(config.mongodb.development, {useNewUrlParser: true});
    }

}

module.exports = Database;