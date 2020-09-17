const LoginController = require('../controllers/LoginController');
const UserController = require('../controllers/UserController');
const CityController = require('../controllers/CityController');
const WeatherController = require('../controllers/WeatherController');

const Token = require('../helpers/Token');

const loginController = new LoginController();
const userController = new UserController();
const cityController = new CityController();
const weatherController = new WeatherController();

module.exports = (app) => {

    const userRoutes = userController.routes();
    const loginRoutes = loginController.routes();
    const weatherRoutes = weatherController.routes();
    const cityRoutes = cityController.routes();

    const verifyJWT = Token.verifyJWT;

    app.route(userRoutes.create)
        .post(userController.createNewUser());

    app.route(loginRoutes.login)
        .post(loginController.login());

    app.route(userRoutes.getUsers)
        .get(verifyJWT, userController.getUsers());

    app.route(weatherRoutes.weather)
        .get(/*verifyJWT, */weatherController.weather());

    app.route(cityRoutes.getCities)
        .get(verifyJWT, cityController.getSearchCities());

    app.route('/*')
        .get((req, resp) => {
            resp.status(404).json(
                {
                    msg: 'Rota inválida!'
                });
        });
};