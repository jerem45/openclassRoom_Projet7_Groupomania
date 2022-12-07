const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");
const Schema = mongoose.Schema(
  {
    userId: { type: String, required:true},
    post: { type: String, required: false},
    userName :{type:String, required: false},
    userJob : {type:String, required: false},
    userImg : {type:String, required: false},
    likes: { type: Number, default: 0 ,required: false},
    dislikes: { type: Number, default: 0 ,required: false},
    usersLiked: { type: [String],required: false},
    usersDisliked: { type: [String],required: false},
  },
  { timestamps: true }
);
Schema.plugin(sanitizerPlugin);
module.exports = mongoose.model("post", Schema);
