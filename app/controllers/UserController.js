const Database = require('../config/Database');
const Crypto = require('../helpers/Crypto');
const User = require('../models/User');
const config = require('../config/settings.json');

class UserController extends Database {

    constructor() {

        super();
    }

    routes() {
        return {
            create: '/user/create',
            getUsers: '/user/list'
        };
    }

    getUsers() {

        try {

            return (error, resp) => {

                User.find((error, usuarios) => {
                    if (error)
                        console.log(error);

                    resp.status(200).json(usuarios);

                });
            }
        } catch (err) {
            console.log(err);
        }

    }

    createNewUser() {

        try {

            return ((req, resp) => {

                let data = req.body;

                req.assert("login", config.alerts.login_required).notEmpty().len(5, 16);
                req.assert("password", config.alerts.password_required).notEmpty().len(5, 10);

                const errors = req.validationErrors();

                if (errors) {
                    resp.status(400).json(errors);
                    return false;
                }

                User.findOne({login: req.body.login}, (error, usuario) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    if (usuario) {

                        resp.status(401).json(
                            {
                                msg: config.alerts.user_create_error
                            });

                    } else {

                        data = Object.assign(data, {

                            password: Crypto.cipher(data.password)

                        });

                        const user = new User(data);

                        user.save((error) => {
                            if (error) {
                                resp.status(500).json(error);

                            } else {

                                resp.status(200).json(
                                    {
                                        msg: config.alerts.user_create_success
                                    });
                            }
                        });
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController;