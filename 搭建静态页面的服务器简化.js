const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.listen(8080,()=>{
    console.log('服务器可以通过127.0.0.1访问');
})

server.on('request',(req,res)=>{
    if(req.url.startsWith('/assets') || req.url.startsWith('/views')){
        fs.readFile('.' + req.url,(err,data)=>{
            if(err) throw err;
            res.end(data);
        })
    }
})