const Middleware = require('../config/Middleware');
const PlaylistController = require('./PlaylistController');
const CityController = require('./CityController');
const config = require('../config/settings');

const playlistController = new PlaylistController();
const cityController = new CityController();

class WeatherController {

    routes() {
        return {
            weather: '/weather/:city'
        };
    }

    weather() {

        try {

            return (req, resp) => {

                const request = Middleware.request();

                let city = req.params.city;

                city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/([^\w]+|\s+)/g, ' ');

                const uri = config.openweather.uri + '=' + city + '&units=' + config.openweather.units + '&APPID=' + config.openweather.api_key;

                request(uri, async (error, response, body) => {

                    let statusCode = response.statusCode;

                    if (statusCode !== 200) {

                        resp.status(statusCode).json(
                            {
                                city: city,
                                msg: config.alerts.search_city
                            });

                        return false;
                    }

                    let parse = JSON.parse(body);

                    let params =
                        {
                            city: parse['name'],
                            country: parse['sys']['country'],
                            wind: parse['wind']['speed'],
                            temp: parse['main']['temp'],
                            temp_min: parse['main']['temp_min'],
                            temp_max: parse['main']['temp_max'],
                            pressure: parse['main']['pressure'],
                            humidity: parse['main']['humidity']
                        };

                    let temp = Math.round(params.temp);

                    let category;

                    if (temp < 10) {
                        category = 'classical'
                    } else if (temp >= 10 && temp <= 25) {
                        category = 'rock';
                    } else if (temp > 25) {
                        category = 'pop'
                    }

                    let playlist = await playlistController.getPlaylistFromWeather(category, params.country);

                    cityController.registerNewSearch(params);

                    resp.status(statusCode).json(
                        {
                            city: parse['name'],
                            temp: temp,
                            metrics: 'ºC',
                            category: category,
                            suggested_playlist: playlist
                        });
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = WeatherController;