const Router = require('koa-router')
const user = require('../../controller/user')
const artical = require('../../controller/artical')
const router = new Router({
    prefix: '/api'
})


module.exports = (app) => {

    // user
    router.post('/user/register', user.register)
    router.post('/user/login',user.login)
    router.get('/user/getDetail',user.getDetail)
    router.post('/user/query',user.query)
    router.post('/user/delete',user.delete)
    router.post('/user/update',user.update)

    // artical
    router.post('/artical/create', artical.create)
    router.post('/artical/query', artical.query)
    router.post('/artical/delete', artical.delete)
    router.get('/artical/getDetail', artical.getDetail)
    router.get('/artical/update', artical.update)
    
    app.use(router.routes())
};