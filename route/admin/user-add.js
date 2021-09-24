const { User,validUser } = require('../../model/User')
// 密码加密模块
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  try {
    // 验证用户信息是否符合规则
    await validUser(req.body)
  } catch (err) {
    // 验证未通过 重定向回添加页面
   return res.redirect(`/admin/user-add?message=${err.message}`)
  }

  const newUser = req.body;

  const user = await User.findOne({ email: newUser.email })
  
  if (user) {
    return res.redirect(`/admin/user-add?okmessage=用户创建失败&message=邮箱已被占用`);
  } else {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(newUser.password, salt)

    User.create({
      username: newUser.username,
      email: newUser.email,
      password: password,
      role: newUser.role,
      state:newUser.state
    })

    // 添加成功重新跳转页面
    return res.redirect(`/admin/user-add?okmessage=用户创建成功`);
  }
}