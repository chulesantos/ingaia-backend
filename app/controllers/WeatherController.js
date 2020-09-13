const Middleware = require('../config/Middleware');
const config = require('../config/settings');

class WeatherController {

    constructor() {

    }

    routes() {
        return {
            clima: '/clima/:city'
        };
    }

    clima() {

        return function (req, resp) {

            const request = Middleware.request();

            const city = req.params.city;

            const uri = config.openweather.uri + '=' + city + '&units=' + config.openweather.units + '&APPID=' + config.openweather.api_key;

            request(uri, function (error, response, body) {

                let statusCode = response.statusCode;

                if (statusCode !== 200) {

                    resp.status(statusCode).json(
                        {
                            city: city,
                            msg: 'Cidade não localizada!'
                        });

                    return false;
                }

                let parse = JSON.parse(body);

                let temp = Math.round(parse['main']['temp']);

                resp.status(statusCode).json(
                    {
                        city: city,
                        temp: temp,
                        metrics: 'ºC'
                    });
            });
        }
    }
}

module.exports = WeatherController;