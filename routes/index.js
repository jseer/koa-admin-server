module.exports = (app) => {
    require('./static')(app)
    require('./api')(app)
}