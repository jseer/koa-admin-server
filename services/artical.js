const ArticalModel = require("../db/models/artical");

const articalService = {
  async create(user, data) {
    const artical = new ArticalModel({ createUser: user, status: 1, ...data });
    const res = await artical.save();
    return res;
  },

  async query(data) {
    const { title = "", pageSize = 10, pageNum = 1 } = data;
    const total = await ArticalModel.countDocuments();
    const list = await ArticalModel.find(
      {
        title: { $regex: new RegExp(title), $options: "ig" },
      },
      { status: 0 }
    )
      .populate("createUser", "name -_id")
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    return { list, total };
  },

  async delete(data) {
    const { ids } = data;
    const res = await ArticalModel.deleteMany({ _id: { $in: ids } });
    return res;
  },

  async getDetailById(id) {
    const res = await ArticalModel.findById(id).populate(
      "createUser",
      "name -_id"
    );
    return res;
  },

  async update(data) {
    const { id, content } = data;
    await ArticalModel.findByIdAndUpdate(id, { $set: { content } });
  },
};

module.exports = articalService;
