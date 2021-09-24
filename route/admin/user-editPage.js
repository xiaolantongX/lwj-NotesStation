const {User} = require('../../model/User')

module.exports = async (req, res) => {
   // 获取到用户数据数组
  const { okmessage, message, id } = req.query;

  const user = await User.findOne({_id:id})

  res.render('admin/user-edit', {
    link: '/admin/user-edit?id=' + id,
    okmessage:okmessage,
    message: message,
    btnMsg: '修改信息',
    id: id,
    user:user
  })
}