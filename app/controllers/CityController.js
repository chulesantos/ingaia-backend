const Database = require('../config/Database');
const City = require('../models/City');
const config = require('../config/settings.json');

class CityController extends Database {

    constructor() {

        super();
    }

    routes() {
        return {
            getCities: '/cities/search'
        };
    }

    getSearchCities() {

        try {

            return (error, resp) => {

                City.find((error, citys) => {
                    if (error)
                        console.log(error);

                    resp.status(200).json(citys);

                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    registerNewSearch(data) {

        try {

            const city = new City(data);

            city.save((error) => {
                if (error)
                    console.log(error);
            });

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CityController;