const Middleware = require('../config/Middleware');
const config = require('../config/settings');

const jwt = Middleware.jwt();
const fileToString = Middleware.fs();

const publicKey = fileToString.readFileSync('./app/config/keys/public.key', 'utf8');
const privateKey = fileToString.readFileSync('./app/config/keys/private.key', 'utf8')

class Token {

    static generateJWT(id) {

        const token = jwt.sign({id}, privateKey, {
            expiresIn: config.jwt.expiresIn, // 8min
            algorithm: config.jwt.algorithm //SHA-256 hash signature
        });

        return token;
    }

    static verifyJWT(req, resp, next) {

        const token = req.headers['authorization'];

        if (!token) {
            return resp.status(401).json(
                {
                    auth: false,
                    message: 'Token não informado.'
                });
        }

        jwt.verify(token, publicKey, {algorithm: [config.jwt.algorithm]}, (err, decoded) => {

            if (err) {
                return resp.status(401).json(
                    {
                        auth: false,
                        message: 'Token inválido.'
                    }
                );
            }

            next();
        });
    }
}

module.exports = Token;
