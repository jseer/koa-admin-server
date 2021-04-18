module.exports = function setRunValidators(schema) {
    schema.pre(['findOneAndUpdate', 'update', 'updateMany', 'updateOne'], function(next) {
        this.setOptions({runValidators: true})
        next();
    })
}