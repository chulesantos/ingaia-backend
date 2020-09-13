const Database = require('../config/Database');
const Crypto = require('../helpers/Crypto');
const User = require('../models/User');

class UserController extends Database {

    constructor() {

        super();

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
                if (error)
                    resp.send(error);

                resp.json(usuarios);

            });
        }
    }

    cadastro() {

        return function (req, resp) {

            let data = req.body;

            User.findOne({login: req.body.login}, function (error, usuario) {

                if (usuario) {

                    resp.status(401).json(
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

                            resp.status(200).json(
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