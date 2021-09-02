const mongoose = require('mongoose');
const { use } = require('../routes/pets.routes');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    firstname : {
        type : String,
        required: true
    },
    mail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
}, {timestamps: true})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;