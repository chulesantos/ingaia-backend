const LoginController = require('../controllers/LoginController');
const UserController = require('../controllers/UserController');
const WeatherController = require('../controllers/WeatherController');

const Token = require('../helpers/Token');

const loginController = new LoginController();
const userController = new UserController();
const weatherController = new WeatherController();

module.exports = (app) => {

    /*################################################################*/

    /* BEGIN - Rotas de Login e Autenticação */

    const loginRoutes = loginController.routes();

    app.route(loginRoutes.login)
        .post(loginController.login());

    app.route(loginRoutes.renewtoken)
        .post(Token.renewJWT, loginController.renewToken());

    /* END - Rotas de Login e Autenticação */

    /*################################################################*/

    /*################################################################*/

    /* BEGIN - Rotas de Cadastro de Usuário */

    const userRoutes = userController.routes();

    app.route(userRoutes.listar)
        .get(/*Token.verifyJWT,*/ userController.listar());

    app.route(userRoutes.cadastro)
        .post(/*Token.verifyJWT,*/ userController.cadastro());

    /* END - Rotas de Cadastro de Usuário */

    /*################################################################*/

    const weatherRoutes = weatherController.routes();

    app.route(weatherRoutes.clima)
        .get(/*Token.verifyJWT,*/ weatherController.clima());

};