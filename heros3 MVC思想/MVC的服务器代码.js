/**
 *  分层思想:
 *      一个js负责开启服务器
 *      一个js负责判断请求
 *      一个js负责处理请求和返回请求         
 *      一个js负责读写json文件
 */

 const http = require('http');
 const server = http.createServer();
 const router = require('./MVC的路由层');

 server.listen(8080,()=>{
     console.log('可以通过127.0.0.1访问')
 })

 server .on('request',(req,res)=>{
    router(req,res)
 })