const UserModel = require("../db/models/users");

const userService = {
  async create(data) {
    const res = await UserModel.create(data);
    return res;
  },

  async get(data) {
    const { name, password } = data;
    const res = await UserModel.findOne({ name, password });
    return res;
  },

  async getDetailById(id) {
    const res = await UserModel.findOne({ _id: id });
    return res;
  },

  async query(data) {
    const { name='', pageSize=10, pageNum=1 } = data;
    const total = await UserModel.countDocuments();
      const list = await UserModel.find({name: { $regex: new RegExp(name), $options: 'ig'}})
      .skip((pageNum-1) * pageSize)
      .limit(pageSize);
    return { list, total };
  },

  async delete(data) {
    const { ids } = data;
    const res = await UserModel.deleteMany({ _id: {$in: ids} });
    return res;
  },

  async update(data) {
    const { id } = data;
    const res = await UserModel.findOneAndUpdate({ _id: id }, data);
    return res;
  },
}

module.exports = userService;
