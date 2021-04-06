const BaseControll = require('../util/baseClass')

class UserController extends BaseControll{
    async register(ctx) {
        try {
            const result = await this.services.users.create(this.body);
            ctx.body = {
                code: 200,
                data: result._id,
            }
        } catch(e) {
            ctx.body = {
                code: 501,
                data: null,
                message: e,
            }
            throw e;
        }
    }
}

module.exports = UserController;