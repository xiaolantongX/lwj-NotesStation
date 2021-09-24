const { Article } = require('../../model/Article')
const { Comment } = require('../../model/Comment')

module.exports = async (req, res) => {
  const id = req.query.id;

  const article = await Article.findOne({ _id: id }).populate('author').lean();
  // res.send(article)
  const comments = await Comment.find({ aid: id }).populate('uid').lean();
  // res.send(comments);
  // return;
  res.render('home/article', {
    article,
    comments
  })
}