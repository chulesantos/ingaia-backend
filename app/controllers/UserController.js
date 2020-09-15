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

        return (error, resp) => {

            User.find((error, usuarios) => {
                if (error)
                    resp.status(500).json(error);

                resp.status(200).json(usuarios);

            });
        }
    }

    cadastro() {

        return (req, resp) => {

            let data = req.body;

            User.findOne({login: req.body.login}, (error, usuario) => {

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

                    user.save((error) => {
                        if (error) {
                            resp.status(500).json(error);

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