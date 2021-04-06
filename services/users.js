const BaseService = require('../util/baseClass')

class UserService extends BaseService{
    async create(data) {
        const res = await this.models.users.create(data);
        return res;
    }
}

module.exports = UserService;