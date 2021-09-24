const { User } = require('../../model/User')

const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const { username ,email ,password, role, state} = req.body
  // 获取到用户id
  const id = req.query.id

  const user = await User.findOne({ _id: id })

  // 密码比对
  const isVaile = await bcrypt.compare(password, user.password)

  if (isVaile) {
    // 密码比对成功
    await User.updateOne({ _id: id }, {
      username: username,
      email: email,
      role: role,
      state: state
    })
    res.redirect('/admin/user')

  } else {
    // 密码比对失败
    return res.render('admin/user-edit', {
      user: user,
      okmessage: '用户信息修改失败',
      message: '密码比对失败, 请重新输入密码！！',
      id: id,
      btnMsg:'修改信息'
    })
  }
  
  // res.send(user)
  // const 
}