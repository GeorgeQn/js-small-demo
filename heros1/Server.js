//创建服务器
//处理静态资源


//先引入需要到的模块
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');

//接入ip和端口
const server = http.createServer();
server.listen(8080, () => {
    console.log('可以通过127.0.0.1:8080访问');
});

//注册事件
server.on('request', (req, res) => {
    //找出静态资源，让他们动态起来，那么先将他们分类号在assets 和 views里面
    if (req.url.startsWith('/assets') || req.url.startsWith('/views')) {
        //找出来之后，就fs写出来,需要给css一个相应头
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-type', 'text/css');
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data)
        })
    } else {
        //用'get'，要解析url，?后面的数分割，但用url.prase这个模块帮手
        let result = url.prase(req.url, true);

        if (req.url === '/views/index.html') {
            fs.readFile(__dirname + '/data/heros.json', 'utf-8', (err, data) => {
                if (err) console.log(err);
                //将字符串转换为数组
                let arr = JSON.parse(data);
                let html = template(__dirname + '/views/index.html',{arr})
                res.end(html)
            })
        }else if(req.url === '/views/add.html'){
            fs.readFile(__dirname + '/views/add.html',(err,data)=>{
                if(err) console.log(err);
                res.end(data);
            })
        }
        //编辑的页面没有动态数据，所以不需要模板引擎
    }

    //约定好接口的名字是: .addHero
    if(result.pathname === '/addHero' && result.method === 'GET'){
        //思路是，拿数据出来，然后添加一个新数据的id，再覆盖回去
        fs.readFile('./data/heros.json','utf-8',(err,data)=>{
            if(err) console.log(err);
            let arr = JSON.parse(data);
            let id = 0;
            //遍历让他编程最大的id，然后再最大的id+1
            arr.forEach(e=>{
                if(e.id>id){
                    id = e.id
                }
            })
            //result query ???
            result.query.id = id + 1;
            arr.push(result.query);
            let jsonStr = JSON.stringify(arr);
            fs.writeFile('.data/heros.json',jsonStr,'utf-8',(err)=>{
                if(err) console.log(err);
                res.end(JSON.stringify({code:200,msg:'操作成功'}));
            })
        })
    }
})