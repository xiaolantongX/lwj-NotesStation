const { Article } = require('../../model/Article')
// 导入mongoose-sex-page 分页模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const page = req.query.page;
   // 标记当前所在的页面  访问文章管理页面
  req.app.locals.currentLink = 'article'
  const count = await Article.countDocuments({})
    // 获取所有文章数据  根据author字段进行连表查询
    // const articles = await Article.find();    
    // const articles = await Article.find().populate('author'); //会报错
  // 解决方案1 .lean();
  // 使用分页模块
  // page 
  let articles = await pagination(Article).find().page(page).size(10).display(5).populate('author').exec();
 
  articles = JSON.parse(JSON.stringify(articles))
  // 解决方案2
  //const articles = JSON.parse(JSON.stringify(articles))
  // res.send(articles)
  
  res.render('admin/article', {
    articles:articles,
    num:count 
  })
}