// 导入mongoose第三方模块
const mongoose = require('mongoose')
// 导入配置模块
const config = require('config')

// 连接数据库
// mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true   })
// 账户密码登陆  itlwj:itlwj 读写权限  root:root 所有权限
//mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,
 //  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
 // .then(() => {
 //    console.log('数据库连接成功!!');
 //})
 // .catch(() => {
 //    console.log('数据库连接失败!!');
  // })
   mongoose.connect(`mongodb://itlwj:itlwj@localhost:27017/blog`,
   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
     console.log('数据库连接成功!!');
  })
  .catch(() => {
     console.log('数据库连接失败!!');
   })