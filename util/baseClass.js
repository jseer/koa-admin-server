class BaseClass {
    constructor(app) {
        this.app = app;
        this.ctx = app.ctx;
    }

    get logger() {
        return this.app.logger
    }

    get body() {
        return this.ctx.request.body;
    }

    get query() {
        return this.ctx.query;
    }

    get models () {
        return this.app.models;
    }

    get services() {
        return this.app.services;
    }
}

module.exports = BaseClass;