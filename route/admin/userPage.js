const { User } = require('../../model/User')

module.exports = async function (req, res) {
  // 标记当前所在的页面 访问用户管理页面
  req.app.locals.currentLink = 'user'

  // 获取当前所在的页数
  const page = req.query.page || 1;
  // 定义每一页的数据条数
  let pageSize = 10;
  // 用户表的用户数
  const count = await User.countDocuments({});
  // 总页数
  let total = Math.ceil(count / pageSize);
  
  let start = (page - 1) * pageSize;
  // 所有的用户对象  
  // 分页查询  
  //limit 限制每次查询的数据条数
  // skip  每次查询的起始位置
  const users = await User.find({}).limit(pageSize).skip(start);
  // res.send(users)
  res.render('admin/user', {
    num: count,
    users: users,
    page: page,
    total: total
  });
}