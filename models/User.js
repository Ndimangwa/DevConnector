const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

/*user is the name of the model [collection/table] , UserSchema is this schema and User is the name of this export*/
//module.exports = User = mongoose.model('user', UserSchema);
const User = mongoose.model('user', UserSchema);
module.exports = User