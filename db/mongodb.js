const mongoose = require('mongoose')
const {
    MONGODB_CONFIG
} = require('../config')
const setRunValidators = require('./plugins/setRunValidators')

module.exports = (app) => {
    mongoose.plugin(setRunValidators);
    
    mongoose.connect('mongodb://localhost:27017', {
        ...MONGODB_CONFIG,
        useFindAndModify: false,
        useCreateIndex: true,
    })

    const connection = mongoose.connection;

    connection.on('connected', function () {
        console.log('### mongodb connected')
    })

    connection.on('disconnected', function () {
        console.log('### mongodb disconnected')
    })
}