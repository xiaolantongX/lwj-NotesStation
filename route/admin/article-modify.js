// 导入formidable第三方模块  作用：接收二进制数据 进行处理
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/Article')

module.exports =async (req, res) => {
  const id = req.query.id;


    // 创建表单解析对象
  const form = new formidable.IncomingForm()
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  
    // 上传文件是否添加后缀
  form.keepExtensions = true;
  
  form.parse(req, async (err, fields, files) => {
    // res.send(files) 
    await Article.updateOne({ _id: id },{
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content:fields.content
    })

    res.redirect('/admin/article')
  })
}