
const log4js = require('log4js');

module.exports = (app) => {
    const { levels } = log4js;
    log4js.configure({
        appenders: {
            console: {
                type: 'console',
            },
            access: {
              type: "dateFile",
              filename: "log/access/access.log",
              pattern: "_yyyy-MM-dd",
              compress: true,
            },
            app: {
              type: "file",
              filename: "log/app/app.log",
              maxLogSize: 10485760, // 10M
            },
            errors: {
              type: "dateFile",
              filename: "log/errors/errors.log",
              pattern: "_yyyy-MM-dd",
              compress: true,
            },
          },
          categories: {
            default: { appenders: [ "app", 'console' ], level: levels.DEBUG },
            http: { appenders: [ "access"], level: levels.INFO },
            error: { appenders: ['errors'], level: levels.ERROR }
          }
    });
    
    const errorLogger = log4js.getLogger('error');
    const httpLogger = log4js.getLogger('http');
    const logger = log4js.getLogger();
    app.logger = logger;
    app.errorLogger = errorLogger;
    app.use(async (ctx, next) => {
        await log4js.connectLogger(httpLogger, {level: levels.INFO })(ctx.req, ctx.res, next)
    })
}