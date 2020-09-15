const Database = require('../config/Database');
const City = require('../models/City');

class CityController extends Database {

    constructor() {

        try {

            super();

        } catch (e) {
            console.log(e)
        }

    }

    routes() {
        return {
            listar: '/city/listar'
        };
    }

    listar() {

        return (error, resp) => {

            City.find((error, citys) => {
                if (error)
                    resp.send(error);

                resp.status(200).json(citys);

            });
        }
    }

    cadastro(data) {

        const city = new City(data);

        city.save((error) => {
            if (error)
                resp.send(error);
        });

    }
}

module.exports = CityController;