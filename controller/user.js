const userService = require('../services/users')

const userController = {
    async register(ctx) {
        const body = ctx.request.body;
        const result = await userService.create(body);
        ctx.body = {
            code: 200,
            data: result._id,
        }
    },

    async login(ctx) {
        const body = ctx.request.body;
        const user = await userService.get(body);
        if(user) {
            ctx.session.userId = user._id;
            ctx.body = {
                code: 200,
                data: null,
                message: '登录成功',
            }
        } else {
            ctx.body = {
                code: 501,
                data: null,
                message: '用户不存在'
            }
        }
    },

    async getDetail(ctx) {
        const { id } = ctx.query;
        const user = await userService.getDetailById(id);
        if(user) {
            ctx.body = {
                code: 200,
                data: user,
            }
        } else {
            ctx.body = {
                code: 501,
                data: null,
                message: '用户不存在'
            }
        }
    },

    async query(ctx) {
        const body = ctx.request.body;
        const { list, total } = await userService.query(body);
            ctx.body = {
                code: 200,
                data: {
                    list,
                    total,
                },
            }
    },

    async delete(ctx) {
        const body = ctx.request.body;
        const res = await userService.delete(body);
        if(res.deletedCount && res.ok) {
            ctx.body = {
                code: 200,
                data: true,
            }
        } else {
            ctx.body = {
                code: 501,
                data: null,
                message: '删除失败'
            }
        }
    },

    async update(ctx) {
        const body = ctx.request.body;
         await userService.update(body);
            ctx.body = {
                code: 200,
                data: true,
            }
    },
}

module.exports = userController;