const Middleware = require('./Middleware');

const routes = require('./routes');

const express = Middleware.express();

const expressValidator = Middleware.expressValidator();

const bodyParser = Middleware.bodyParser();

const app = express();

app.use(expressValidator());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

routes(app);

module.exports = app;




