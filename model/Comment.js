
const mongoose = require('mongoose');

// 创建评论集合的规则
const commentSchema = {
  // 存储评论文章的id
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Article'
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  date: {
    type: Date,
  },
  content: {
    type:String
  }
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Comment
}