// const http = require('http');
// const fs = require('fs');

// const server = http.createServer();

// server.listen(8080,()=>{
//     console.log('可以通过127.0.0.1访问');
// });

// server.on('request',(req,res)=>{
//     if(req.url.startWidth('/assets') || req.url.startWidth('/views')){
//         //css比较特殊
//         if(req.url.endWidth('/end')){
//             res.setHeader('Content-Type','text/css');
//         };
//         fs.readFile('.' + req.url,(err,data)=>{
//             if(err) throw err;
//             res.end(data);
//         })
//     }
// })

const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.listen(8080,()=>{
    console.log('可以通过127.0.0.1访问')
})

server.on('request',(req,res)=>{
    
})