module.exports = (req, res, next) => {
  // t1.请求的不是login页面 t2.session.username中不存在值 如果登陆成功过 session中是存在值的
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    // 如果普通用户访问管理员界面  重定向到首页
    if (req.session.role == 'normal') {
      return res.redirect('/home/index')
    }
    // 将请求放行
    next();
  }
}