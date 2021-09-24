// 导入formidable第三方模块  作用：接收二进制数据 进行处理
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/Article')

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  
    // 上传文件是否添加后缀
    form.keepExtensions = true;
  
    form.parse(req,async (err, fields, files) => {
      // err 错误对象  表单解析错误 存储错误的信息
      // fields  保存普通表单数据
      // files 保存上传文件相关的数据
      // res.send(files)
      // 将在服务器的本地绝对路径截取  用于拼接当前服务器的路径
      // res.send(files.cover.path.split('public')[1]);
     await Article.create({
        title:fields.title,
        author:fields.author,
        publishDate: fields.publiashDate,
        cover:files.cover.path.split('public')[1],
        content:fields.content,
      })

      res.render('admin/article-edit', {
        okmessage: '文章发布成功',
        btnMsg:'发布文章'
      })
    })
}