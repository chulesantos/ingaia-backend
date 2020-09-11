const Middleware = require('../config/Middleware');

const mongoose = Middleware.mongoose();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    login: {type: String, required: true},
    password: {type: String, required: true},
    dt_insert: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('User', UserSchema);
