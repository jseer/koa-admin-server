const Router = require('koa-router')
const router = new Router()


module.exports = (app) => {
    router.get('/', async (ctx) => {
        ctx.body = '首页'
    })

    app.use(router.routes())
};