const Database = require('../config/Database');
const Middleware = require('../config/Middleware');
const Token = require('../helpers/Token');
const Crypto = require('../helpers/Crypto');

const User = require('../models/User');

class LoginController extends Database {

    constructor() {

        super();
    }

    routes() {
        return {
            login: '/login'
        };
    }

    login() {

        return (req, resp) => {

            User.findOne(
                {
                    login: req.body.login,
                    password: Crypto.cipher(req.body.password)
                }, (error, usuario) => {

                    if (usuario) {

                        const fileToString = Middleware.fs();

                        const id = usuario._id

                        const token = Token.generateJWT(id);

                        resp.status(200).json(
                            {
                                auth: true,
                                token: token,
                                msg: 'Autenticação Válida!'
                            });

                    } else {

                        resp.status(401).json(
                            {
                                auth: false,
                                token: null,
                                msg: 'Autenticação Inválida!'
                            });
                    }
                });
        }
    }
}

module.exports = LoginController;