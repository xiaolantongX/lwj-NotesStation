module.exports = (req, res) => {
  req.session.destroy(function () {
    // 删除Cookie数据 
    res.clearCookie('cnnect.sid');

    // 重定向到登陆页面
    res.redirect('/admin/login');

    // 清除模板中的用户信息
    req.app.locals.userInfo = null;

  })
}