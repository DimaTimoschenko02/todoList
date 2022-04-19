const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const TODO = new Schema(
  {
    content: {
      required: true,
      type: String,
    },
    comments: {
      type: String,
      default: "write here smth",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checked: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

//module.exports = model('TODO' , TODO)
module.exports = mongoose.models.TODO || mongoose.model("TODO", TODO);
