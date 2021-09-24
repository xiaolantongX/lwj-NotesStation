
module.exports = (req, res) => {
  res.render('admin/article-edit', {
    btnMsg: '发布文章',
    link:'/admin/article-add'
  })
}