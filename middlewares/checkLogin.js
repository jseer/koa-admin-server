module.exports = function(options = {}) {
    const { ignore } = options;
    return (ctx, next) => {
        if(ignore && !ignore(ctx)) {
            if(!ctx.session.userId) {
                return ctx.redirect('/');
            } else {
                return next();
            }
        }
        return next();
    }
}
