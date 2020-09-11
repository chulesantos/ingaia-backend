const Middleware = require('../config/Middleware');
const Token = require('../helpers/Token');
const Crypto = require('../helpers/Crypto');
const config = require('../config/settings');
const User = require('../models/User');

class LoginController {

    constructor() {

        const mongoose = Middleware.mongoose();

        mongoose.Promise = global.Promise;

        mongoose.connect(config.mongodb.development, {useNewUrlParser: true});
    }

    routes() {
        return {
            login: '/login',
            renewtoken: '/login/renewtoken'
        };
    }

    login() {

        return function (req, resp) {

            User.findOne(
                {
                    login: req.body.login,
                    password: Crypto.cipher(req.body.password)
                }, function (error, usuario) {

                    if (usuario) {

                        const fileToString = Middleware.fs();

                        const id = usuario._id

                        const token = Token.generateJWT(id);

                        resp.json(
                            {
                                auth: true,
                                token: token,
                                msg: 'Autenticação Válida!'
                            });

                    } else {

                        resp.json(
                            {
                                auth: false,
                                token: null,
                                msg: 'Autenticação Inválida!'
                            });
                    }
                });
        }
    }

    renewToken() {
        return function (error, resp) {
        }
    }
}

module.exports = LoginController;