const express = require('express')

const admin = express.Router()

admin.get('/login', require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))

admin.get('/user', require('./admin/userPage'))

admin.get('/user-add', require('./admin/user-addPage'))

admin.post('/user-add', require('./admin/user-add'))

admin.get('/user-edit', require('./admin/user-editPage'))

admin.post('/user-edit', require('./admin/user-modify'))

admin.get('/logout',require('./admin/logout') )

admin.get('/article', require('./admin/article'))

admin.get('/article-add', require('./admin/article-addPage'))

admin.post('/article-add',require('./admin/article-add'))

admin.get('/article-edit', require('./admin/article-editPage'))

admin.post('/article-edit', require('./admin/article-modify'))

admin.get('/user-delete', require('./admin/user-delete'))

admin.get('/article-delete',require('./admin/article-delete'))

module.exports = admin;