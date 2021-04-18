const articalService = require('../services/artical');

const articalController = {
    async create(ctx) {
        const body = ctx.request.body;
        let id = '607ae5b85d7a58344809f4e3'
        await articalService.create(id, body);
        ctx.body = {
            code: 200,
            data: true,
        }
    },

    async query(ctx) {
        const body = ctx.request.body;
        const { total, list } = await articalService.query(body);
        ctx.body = {
            code: 200,
            data: {
                total,
                list,
            },
        }
    },
    async delete(ctx) {
        const body = ctx.request.body;
        const res = await articalService.delete(body);
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

    async getDetail(ctx) {
        const { id } = ctx.query;
        const artical = await articalService.getDetailById(id);
        if(artical) {
            ctx.body = {
                code: 200,
                data: artical,
            }
        } else {
            ctx.body = {
                code: 501,
                data: null,
                message: '用户不存在'
            }
        }
    },

    async update(ctx) {
        const body = ctx.request.body;
         await articalService.update(body);
            ctx.body = {
                code: 200,
                data: true,
            }
    },

    async addContributor(ctx) {
        const body = ctx.request.body;
         await articalService.addContributor(body);
            ctx.body = {
                code: 200,
                data: true,
            }
    },
}

module.exports = articalController;