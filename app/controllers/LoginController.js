const Database = require('../config/Database');
const Middleware = require('../config/Middleware');
const Token = require('../helpers/Token');
const Crypto = require('../helpers/Crypto');
const config = require('../config/settings.json');

const User = require('../models/User');

class LoginController extends Database {

    constructor() {

        super();
    }

    routes() {
        return {
            login: '/user/login'
        };
    }

    login() {

        try {

            return (req, resp) => {

                User.findOne(
                    {
                        login: req.body.login,
                        password: Crypto.cipher(req.body.password)
                    }, (error, usuario) => {

                        if (error) {
                            resp.status(500).json(error);
                            return false;
                        }

                        if (usuario) {

                            const fileToString = Middleware.fs();

                            const id = usuario._id;

                            const token = Token.generateJWT(id);

                            resp.status(200).json(
                                {
                                    auth: true,
                                    token: token,
                                    msg: config.alerts.login_sucess
                                });

                        } else {

                            resp.status(401).json(
                                {
                                    auth: false,
                                    token: null,
                                    msg: config.alerts.login_error
                                });
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = LoginController;