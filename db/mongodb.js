const mongoose = require('mongoose')
const { MONGODB_CONFIG } = require('../config')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost:27017', MONGODB_CONFIG)

    const connection = mongoose.connection;
    
    connection.on('connected', function () {
        console.log('### mongodb connected')
    })
    
    connection.on('disconnected', function() {
        console.log('### mongodb disconnected')
    })
}
