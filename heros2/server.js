//因为ajax拿数据要重复多一次，效率低，所以，我们创建一个服务器，用json去存储数据
//动态生成页面

//引入模块
const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('art-template');
//创建服务器
const server = http.createServer();
//端口和ip
server.listen(8080,()=>{
    console.log('可以通过127.0.0.1:8080访问');
})
//注册事件 静态页面变动态页面
server.on('request',(req,res)=>{
    if(req.url.startsWith() === '/assets'){
        //css改一下相应头
        if(req.url.endsWith() === '.css'){
            res.setHeader('Content-type','text/css');
        }
        fs.readFile('.'+req.url,(err,data)=>{
            if (err) console.log(err);
            res.end(data);
        })
    }else{
        //用'get'发送请求,url模块可以将url后缀转化成由?开始获取 把参数变成对象
        let result = url.parse(req.url,true);
        if(req.url === '/views/index.html'){
            //先将json里面的数据由字符串变成数组
            //因为要动态生成数据，所以要引入第三方模板 art-template
            fs.readFile(__dirname+ '/data/heros.json','utf-8',(err,data)=>{
                if(err) console.log(err)
                //json字符串转换成数组
                let arr = JSON.parse(data);
                //然后要用第三方模板art-template渲染动态数据出来
                let html = template(__dirname + '/views/index.html',{arr});
                //把art-template生成的结构返回给浏览器
                res.end(html);
            })
        }
        //add页面无动态数据，不需要
        else if(req.url === '/views/add.html'){
            fs.readFile('./views/add.html','utf-8',(err,data)=>{
                if(err) console.log(err);
                res.end(data);
            })
        }
        //添加接口
        //约定好接口名: '/addHero
        if(result.pathname === '/addHero' && req.method === 'GET'){
            //拿旧数据出来，转换为数组
            fs.readFile('./data/heros.json',(err,data)=>{
                if(err) console.log(err);
            let arr = JSON.parse(data);
            //添加新数据，定义一个新id 比最大id + 1 
            let id = 0;
            arr.forEach( e => {
                if(e.id > id){
                    id = e.id
                }
                //result.query 数据对象
                result.query.id = id + 1;
                arr.push(result.query);
            });
            //然后再将新数组覆盖回去json里面
            let jsonStr = JSON.stringify(arr);
            //写到json里面去
            fs.writeFile('./data/heros.json',jsonStr,'utf-8',(err)=>{
                if(err) console.log(err);
                res.end(JSON.stringify({code:200,msg:'操作成功'}));
            })
        })
    }
}
});


