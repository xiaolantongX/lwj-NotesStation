module.exports = async (req, res) => {
  // 获取到用户数据数组
  const { okmessage,message } = req.query;
 
  res.render('admin/user-edit', {
    link: '/admin/user-add',
    okmessage:okmessage,
    message: message,
    btnMsg:'添加用户'
  })
}