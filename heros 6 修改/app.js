//开启服务器
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();
//设置端口和ip
app.listen(8080,()=>{
    console.log('可以通过127.0.0.1:8080访问');
})

//处理静态资源
app.use('/assets',express.static('assets'));
//设置ejs为默认模板引擎
app.set('view engine','ejs');
//用body-parser解析post
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);