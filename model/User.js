// 导入mongoose第三方模块
const mongoose = require('mongoose')
// 导入密码加密模块
const bcrypt = require('bcrypt')

// 导入表单验证模块
const Joi = require('joi')

//创建一个用户集合规则
// Schema是一个构造函数 返回一个shema的对象实例
const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength:20,
  },
  email: {
    type: String,
    // 保证邮箱地址在插入的数据库中不存在
    unique: true,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  // admin 超级管理员
  // normal 普通用户
  role: {
    type: String,
    required:true
  },
  // 0 启用状态
  // 1 禁用状态
  state: {
    type: Number,
    default:0
  }
})

// 创建用户数据表 mongoose.model
//参数1  表名 参数2  表中的字段及规则
const User = mongoose.model('User', userShema)
// 生成随机字符串
// async function createUser() {
//   // 获取随机加密字符串
//   const salt = await bcrypt.genSalt(10);
//   // 将密码进行随机加密
//   const password =await bcrypt.hash('123456',salt)
//   User.create({
//     username: 'itkobe',
//     email: 'kobe@163.com',
//     password: password,
//     role: 'admin',
//     state:0
//   })
// }
// createUser()


// 验证用户的信息
const validUser = user => {
  const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则要求！！')),
    email: Joi.string().email().required().error(new Error('邮箱格式不符合要求！！')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求！！')),
    role: Joi.string().valid('admin', 'normal').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
  }
  return Joi.validate(user, schema)
}

// 将User的用户数据表暴露出去
module.exports = {
  User,
  validUser
}