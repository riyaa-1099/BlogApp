const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogusers",
    },
  },
  { timestamps: true }
);

const Blogmodel = mongoose.model("blogs", blogSchema);

module.exports = Blogmodel;
