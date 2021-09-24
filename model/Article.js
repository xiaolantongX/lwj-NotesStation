// 导入mongoose模块
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: [true, '请填写文章的标题'] 
  },
  author: {
    type: String,
    // 添加外键 链接User表
    ref: 'User',
    required:[true,'请传递作者名']
  },
  publishDate: {
    type: Date,
    default:Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type:String
  }
})

const Article = mongoose.model('Articel',articleSchema)


module.exports = {
  Article
}
