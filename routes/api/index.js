const Router = require('koa-router')
const router = new Router({
    prefix: '/api'
})


module.exports = (app) => {
    const { controller } = app;
    
    router.get('/register', controller.user.register)
    app.use(router.routes())
};