const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost:27017', {
        user: 'root',
        pass: '123456',
        dbName: 'test',
        autoReconnect: true,
    })

    const connection = mongoose.connection;
    
    connection.on('connected', function () {
        console.log('### mongodb connected')
    })
    
    connection.on('disconnected', function() {
        console.log('### mongodb disconnected')
    })
}
