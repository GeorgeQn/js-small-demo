const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.listen(8080,()=>{
    console.log('可以通过127.0.0.1访问');
})

server.on('request',(req,res)=>{
    if(req.url.startsWidth('/assets') === 0 || req.url.startsWidth('/views'));
    if(req.url.endWidth('/css') === 0){
        res.setHeader('Content-Type','text/css')
        fs.readFile('.'+req.url,(err,data)=>{
            if (err) console.log(err);
            res.end(data);
        })
    }else{
        if(req.url === '/getAllHero'){
            fs.readFile('./data/heros.json'+req.url,(err,data)=>{
                res.end(data);
            })
        }
    }
})