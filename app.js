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
const { loadController, loadServices, loadModels } = require('./util/loader')

const app = new Koa()
app.keys = ['some secret hurr'];

/** 
 * 连接mongodb和redis
 */
mongodb(app)
redis(app)

/** 
 * 加载controller和services
 */
 loadController(app)
 loadServices(app)
 loadModels(app)
 
/** 
 * 日志
 */
log4js(app)

app.use(cors())
app.use(session({
    ...config.SESSION_CONFIG,
    store: new redisStore({
        client: app.redis,
    }),
}, app));
app.use(static(path.resolve(__dirname, 'public')))
app.use(bodyparser())

createRouter(app)

app.on('error', function (err, ctx) {
    ctx.app.errorLogger.error(err)
})

app.listen(3000, ()=> console.log('3000端口已启动'))

