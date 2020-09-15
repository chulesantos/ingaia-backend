const Middleware = require('../config/Middleware');

const mongoose = Middleware.mongoose();
const Schema = mongoose.Schema;

const CitySchema = new Schema({

    city: {type: String, required: true},
    country: {type: String, required: true},
    wind: {type: Number, required: true},
    temp: {type: Number, required: true},
    temp_min: {type: Number, required: true},
    temp_max: {type: Number, required: true},
    pressure: {type: Number, required: true},
    humidity: {type: Number, required: true},
    dt_search: {type: Date, default: Date.now}

});

module.exports = mongoose.model('City', CitySchema);
