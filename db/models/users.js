const mongoose = require('mongoose')

const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {versionKey: false})

const UserModel = model('user', userSchema);

module.exports = UserModel;