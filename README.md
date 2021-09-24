- 密码加密模块 bcrypt
<!-- 所有的函数都是异步函数 -->

<!-- 生成一个随机字符串 -->
const salt = await bcrypt.genSalt(10)  //数字越大 随机数复杂度越高

cosnt result = await bcrypt.hash('123456',salt)  //第一参数 要加密的明文密码  第二个参数 生成的随机字符串

<!-- 对密码进行比对  参数一 客户端传过来的明文密码  参数2 数据库中的加密密码 -->
<!-- 返回一个boolean值  比对是否成功 -->
const isValid = await bcrypt.compare(password,user.password) 
<!-- compare会做三件事情 -->
<!-- 1. 拿到加密密码之后  会解析到加密的随机字符串 (反解析genSalt)-->
<!-- 2. 使用随机字符串对明文密码进行加密 (hash())->
<!-- 3. 拿加密后的明文密码和数据库的密码进行比对  -->


- Cookie和Session		
-   Cookie 浏览器在**电脑硬盘**中存储数据的空间  主要供服务端使用  存储一些sessionId之类的信息
- 1.域名形式存储
- 2.过期时间可自定义 默认浏览器关闭时删除
- 3.请求时会将cookie数据带到服务器
    (1)客户端第一次请求服务器 无cookie
    (2)服务器响应时 将cookie数据存储客户端
    (3)客户端再次请求服务器  将携带cookie一起请求

-   Session 是一个对象 存在**服务端**内存中  yge session可存储多条数据  每条数据唯一的sessionId

- Cookie、Session 验证登录流程
> 客户端提交登录数据到服务器 -> 服务器验证请求参数 -> 验证成功 -> 为当前用户生成sessionId并存储用户信息 -> 将sessionId响应给客户端 写入客户端的cookie中 -> 当客户端再次发送请求 会携带上cookie> 服务器接收到cookie信息 验证sessionId是否存在 若存在 用户是登陆状态 ->  响应登陆后的数据


express-session 中间件

npm install express-session 安装
const session = require('express-session') 导入
app.use(session({secret:'任意字符串'}))  导入到express中 

通过req.session 调用该session对象


-   enctype 指定表单提交数据的编码类型
-       默认  application/x-www-form-urlencoded 
                提交格式 name=zhangsan & age=20
-       multipart/form-data 将表单数据编码成二进制类型
                10100100010100101001...


-   formidable 第三方模块
作用 解析表单  支持get/post请求 支持文件上传
使用 -> -> ->
// 导入formidable第三方模块  作用：接收二进制数据 进行处理
const formidable = require('formidable')

    // 创建表单解析对象
    const form = new formidable.IncomingForm();

    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  
    // 上传文件是否添加后缀
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      // err 错误对象  表单解析错误 存储错误的信息
      // fields  保存普通表单数据
      // files 保存上传文件相关的数据
      res.send(fields);
    })


    mongoDB数据库的安全操作 
    - 默认情况下使用mongo数据库是不需要登陆的  导致任何人只要连接数据库就可以进行所有操作 我们需要给数据库访问用户添加权限
步骤如下

![image-20210826095629126](C:\Users\ASUS111LAN\AppData\Roaming\Typora\typora-user-images\image-20210826095629126.png)

![](C:\Users\ASUS111LAN\AppData\Roaming\Typora\typora-user-images\image-20210826095613772.png)



连接数据库方式

![image-20210826095648091](C:\Users\ASUS111LAN\AppData\Roaming\Typora\typora-user-images\image-20210826095648091.png)

- 开发环境 与 生产环境
-   开发环境  **开发阶段**所处的服务器环境 （一般为本地服务器）
-   生产环境  最后项目**发布阶段**所处的环境 （真实的网站服务器）

区分环境变量的步骤
· 1.配置系统的环境变量NODE_ENV  production/development  
· 2.获取环境变量  使用global对象下的process对象 process.env.NODE_ENV