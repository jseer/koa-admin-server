const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const articalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      match: /^\w+$/,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    createUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contributors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "gmtCreate", updatedAt: "gmtUpdate" },
  }
);

const AritcalModel = model("Artical", articalSchema);
AritcalModel.on('index', function(error) {
    if(error) {
        console.log('AritcalModel index error')
        return;
    }
    console.log('AritcalModel index created')
})
module.exports = AritcalModel;
