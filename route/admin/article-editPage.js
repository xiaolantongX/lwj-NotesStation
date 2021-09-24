const { Article } = require('../../model/Article')

module.exports =async (req, res) => {
  const id = req.query.id;
  const article = await Article.findOne({ _id: id })
  
  // res.send(article)
  res.render('admin/article-edit', {
    btnMsg: '重新发布文章',
    link:'/admin/article-edit?id='+id,
    article: article,
  });
}