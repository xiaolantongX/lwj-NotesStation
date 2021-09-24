// 从model中拿到用户信息的数据库表
const { User } = require('../../model/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  let { email, password } = req.body;
  // console.log(email,password);
  // 判断用户或者密码为空的状态
  if (email.trim().length == 0 || password.trim().length == 0) {
    // 返回400状态码 并加载err页面
    // res.status(400).render('admin/err',{message:'邮箱或者密码错误'});
    // return;
    return res.status(400).render('admin/err',{message:'邮箱或者密码错误'});
  }

  // 账户密码不为空
  // 异步函数查找数据表中是否包含登陆请求中的email
  // 每个email都是独一无二的  所以使用findOne
  //找到返回用户数据对象  没有查找到返回空
  const user = await User.findOne({ email })

  // 1.查找数据表中是否有当前的email
  if (user) {
    // 将客户端传递过来的密码和服务器中的密码进行比对 
    // 比对成功  true  比对失败  false  (异步函数)
    const isViald = await bcrypt.compare(password, user.password)
    if (isViald) {
      // 将用户名以及用户角色存储在session对象中
      req.session.username = user.username;
      req.session.role = user.role;
      console.log(req.session);
      // 登陆成功后将所有的用户信息保存到app.locals对象中 
      req.app.locals.userInfo = user;
      if (user.role == 'normal') {
        res.redirect('/home/')
      } else {
        res.redirect('/admin/user')
      }
      // return res.send('登陆成功')
    } else {
      return res.status(400).render('admin/err', { message: '邮箱或者密码错误' });
    }
  } else {
   return res.status(400).render('admin/err',{message:'邮箱或者密码错误'});
  }

}