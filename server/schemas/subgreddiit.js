const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subgreddiit_schema = new Schema(
  {
    // first_name: { type: String, required: [true, "must be entered"] },
    // second_name: { type: String },
    // age: { type: Number,required:[true] },
    // contact: { type: Number,required:[true] },
    // username: { type: String,required:[true] ,unique:true},
    // email: { type: String, required: [true, "must be entered"] ,unique:true},
    // password: { type: String, required: [true, "must be entered"] },
    moderator: {
      type: Array,
      required: true,
    },
    followers: {type: Array},
    blocked: {type: Array},
    left: {type: Array},
    request: { type: Array },
    no_of_followers: { type: Number },
    no_of_posts: { type: Number },
    Name: { type: String, required: [true, "must be entered"], unique: true },
    description: { type: String },
    banned_keywords: { type: String },
    tags: { type: Array },
  },
  { timestamps: true }
);

const subgreddiit = new mongoose.model("subgreddiit", subgreddiit_schema);
module.exports = subgreddiit;
