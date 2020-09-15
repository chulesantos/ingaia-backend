const Middleware = require('../config/Middleware');
const PlaylistController = require('./PlaylistController');
const CityController = require('./CityController');
const config = require('../config/settings');

const playlistController = new PlaylistController();
const cityController = new CityController();

class WeatherController {

    routes() {
        return {
            clima: '/clima/:city'
        };
    }

    clima() {

        return (req, resp) => {

            const request = Middleware.request();

            const city = req.params.city;

            const uri = config.openweather.uri + '=' + city + '&units=' + config.openweather.units + '&APPID=' + config.openweather.api_key;

            request(uri, async (error, response, body) => {

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

                let playlist = await playlistController.playlist(category, params.country);

                cityController.cadastro(params);

                resp.status(statusCode).json(
                    {
                        city: city,
                        temp: temp,
                        metrics: 'ºC',
                        category: categoria,
                        suggested_playlist: playlist
                    });
            });
        }
    }
}

module.exports = WeatherController;