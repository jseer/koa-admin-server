const mongoose = require('mongoose')

const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: /^\w{3,10}$/,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        match: /^\w{6,20}$/,
        required: true,
    }
}, {versionKey: false})

const UserModel = model('User', userSchema);

UserModel.on('index', function(error) {
    if(error) {
        console.log('UserModel index error')
        return;
    }
    console.log('UserModel index created')
})

module.exports = UserModel;