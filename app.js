const Koa = require('koa')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const session = require('koa-session')
const config = require('./config')
const createRouter = require('./routes')
const mongodb = require('./db/mongodb')
const redis = require('./db/redis')
const redisStore = require('koa-redis')
const log4js = require('./config/log4js')
const validate = require('./config/validate')
const onerror = require('koa-onerror')

const app = new Koa()
app.keys = ['some secret hurr'];

mongodb(app)
redis(app)

log4js(app)
validate(app)

app.use(cors())
onerror(app);
app.use(session({
    ...config.SESSION_CONFIG,
    store: new redisStore({
        client: app.redis,
        password: '123456'
    }),
}, app));
app.use(static(path.resolve(__dirname, 'public')))
app.use(bodyparser())

/** 加载插件 */
const middlewares = [
    ['checkLogin', {
        ignore: function(ctx) {
            return ['/register'].includes(ctx.path);
        }
    }]
];
// for(let [fn, opts] of middlewares) {
//     const fnPath = path.resolve('./middlewares', fn);
//     app.use(require(fnPath)(opts));
// }

createRouter(app)

app.on('error', function (err, ctx) {
    ctx.app.errorLogger.error(err)
    ctx.app.logger.error(err)
})

app.listen(3000, ()=> console.log('3000端口已启动'))

