const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posts_schema = new Schema(
  {
    // first_name: { type: String, required: [true, "must be entered"] },
    // second_name: { type: String },
    // age: { type: Number,required:[true] },
    // contact: { type: Number,required:[true] },
    username: { type: String},
    email: { type: String},
    // password: { type: String, required: [true, "must be entered"] },
    comments: {type: Array},
    upvotes: { type: Number },
    downvotes: { type: Number },
    topic:{type:String},
    Name: { type: String },
    content: { type: String },
    banned_keywords: { type: Array },
    tags: { type: Array },
  },
  { timestamps: true }
);

const posts = new mongoose.model("posts", posts_schema);
module.exports = posts;
