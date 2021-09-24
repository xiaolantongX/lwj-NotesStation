// 导入express框架
const express = require('express')

// 处理路径
const path = require('path')

// 导入session模块
const session = require('express-session')

// 日期格式化第三方模块
const dateFormat = require('dateformat')

// art-template模块
const template = require('art-template')

//导入morgan日志模块
const morgan = require('morgan')

// 导入配置模块
// const config = require('config')

// 创建网站服务
const app = express()

const md5 = require('md5-node')
console.log(md5('123456'))
// 导入body-parse模块 用于解析post请求的数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended:false
}))

// 安装session中间件
app.use(session({ secret: 'secret key' }))

// 连接数据库
require('./model/connect')

// 使用config模块获取title
// console.log(config.get('title'));


if (process.env.NODE_ENV == 'development') {
  console.log('当前开发环境');
  // 在开发环境中 将客户端发送到服务端的请求信息打印到控制台
  app.use(morgan('dev'));
} else {
  console.log('当前生产环境');
}

// 开放静态资源文件 处理静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 配置模板引擎
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'))
// 告诉express模板框架的后缀时什么
app.set('view engine', 'html')
// 当渲染后缀为html的文件时  express使用什么模板框架 
app.engine('html', require('express-art-template'))

// 向模板中导入外部变量
template.defaults.imports.dateFormat = dateFormat

// 拦截请求  判断用户是否登陆
app.use('/admin',require('./middleware/loginGrad'))

const home = require('./route/home')
const admin = require('./route/admin')

app.use('/home', home)
app.use('/admin',admin)

app.listen(8082)
console.log('本地服务已经开启在8082端口');