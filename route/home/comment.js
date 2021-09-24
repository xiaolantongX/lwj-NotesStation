const { Comment } = require('../../model/Comment')
module.exports =async (req, res) => {
  
  const { content, aid, uid } = req.body;

  await Comment.create({
    aid: aid,
    uid: uid,
    content: content,
    date:new Date()
  })

  res.redirect(`/home/article?id=${aid}`)

}