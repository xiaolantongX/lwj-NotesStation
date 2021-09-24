const { User } = require("../../model/User")

module.exports = async (req, res) => {
  // 获取到要删除数据的id
  const id = req.query.id

  await User.findOneAndDelete({ _id: id })
  
  return res.redirect('/admin/user')
}