const Middleware = require('../config/Middleware');
const Crypto = require('../helpers/Crypto');
const config = require('../config/settings');
const User = require('../models/User');

class UserController {

    constructor() {

        const mongoose = Middleware.mongoose();

        mongoose.Promise = global.Promise;

        mongoose.connect(config.mongodb.development, {useNewUrlParser: true});
    }

    routes() {
        return {
            cadastro: '/usuario/cadastro',
            listar: '/usuario/listar'
        };
    }

    listar() {

        return function (error, resp) {

            User.find(function (error, usuarios) {
                if (error) {
                    resp.send(error);

                } else {
                    resp.json(usuarios);
                }
            });
        }
    }

    cadastro() {

        return function (req, resp) {

            let data = req.body;

            User.findOne({login: req.body.login}, function (error, usuario) {

                if (usuario) {

                    resp.json(
                        {
                            msg: 'Login já cadastrado!'
                        });

                } else {

                    data = Object.assign(data, {

                        password: Crypto.cipher(data.password)

                    });

                    const user = new User(data);

                    user.save(function (error) {
                        if (error) {
                            resp.send(error);

                        } else {

                            resp.json(
                                {
                                    msg: 'Usuario Cadastrado com Sucesso!'
                                });
                        }
                    });
                }
            });
        }
    }
}

module.exports = UserController;