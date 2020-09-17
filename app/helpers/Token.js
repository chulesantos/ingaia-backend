const Middleware = require('../config/Middleware');
const config = require('../config/settings');

const jwt = Middleware.jwt();
const fileToString = Middleware.fs();

const publicKey = fileToString.readFileSync('./app/config/keys/public.key', 'utf8');
const privateKey = fileToString.readFileSync('./app/config/keys/private.key', 'utf8')

class Token {

    static generateJWT(id) {

        const token = jwt.sign({id}, privateKey, {
            expiresIn: config.jwt.expiresIn, // 10min
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
                    msg: config.alerts.token_null
                });
        }

        jwt.verify(token, publicKey, {algorithm: [config.jwt.algorithm]}, (err, decoded) => {

            if (err) {
                return resp.status(401).json(
                    {
                        auth: false,
                        msg: config.alerts.login_error
                    }
                );
            }

            next();
        });
    }
}

module.exports = Token;
