const path = require('path')
const fs = require('fs')

const loader = (type, p, isGetInstance=true) => {
    return (app) => {
        const files = fs.readdirSync(p);
        const fileReg = /^([^.]+).js$/;
        const obj = {};
        files.forEach((file) => {
            if(fileReg.test(file)) {
                const property = file.replace(fileReg, '$1');
                    const Con = require(path.resolve(p, file))
                    obj[property] = isGetInstance ? new Con(app) : Con;
            } else {
                console.warn(`${type}文件名不符合要求`)
            }
        })
      
        app[type] = obj;
    }
}

const loadController = loader('controller', path.resolve(path.resolve(__dirname, '../controller')))
const loadServices = loader('services', path.resolve(path.resolve(__dirname, '../services')))
const loadModels = loader('models', path.resolve(path.resolve(__dirname, '../db/models')))
module.exports = {
    loadController,
    loadServices,
    loadModels,
}