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

    app.route(userRoutes.cadastro)
        .post(userController.cadastro());

    app.route(loginRoutes.login)
        .post(loginController.login());

    app.route(userRoutes.listar)
        .get(/*Token.verifyJWT,*/ userController.listar());

    app.route(weatherRoutes.clima)
        .get(/*Token.verifyJWT,*/ weatherController.clima());

    app.route(cityRoutes.listar)
        .get(/*Token.verifyJWT,*/ cityController.listar());

    app.route('/*')
        .get((req, resp) => {
            resp.status(404).json({

                msg: 'Rota inválida!'

            });
        });

};