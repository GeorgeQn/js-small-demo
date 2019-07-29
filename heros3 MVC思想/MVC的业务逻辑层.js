const fs = require('fs');
const template = require('art-template');
const queryString = require('querystring');
const model = require('./MVC的数据模型层');

let controller = {
    //处理静态资源的方法
    staticRescoure : function(req,res){
        if(req.url.endsWith === '.css'){
            res.setHeader('Content-Type','text/css;charset=utf-8');
        }
        fs.readFile(__dirname + req.url,'utf-8',(err,data)=>{
            if(err) console.log(err);
            res.endsWith(data);          
        })
    },

    //处理主页的方法
    getIndexHtml:function(req,res){
        if(req.url === '/views/index.html'){
            //生成动态网站，art-template,调用model里面封装的数据
            model.getAllHero(function(array){
                let html = template(__dirname + '/views/index.html',{array});
                res.end(html);
            })
        }
    },

    //处理新增页面
    getAddHtml:function(req,res){
        fs.readFile('/views/add.html',(err,data)=>{
        if(err) console.log(err);
            res.end(data);
        })
    },
    addNewHero:function(req,res){
        let data = '';
        req.on('data',(chunk)=>{
            data += chunk;
        })
        req.on('end',()=>{
            data = queryString.parse(data);
            model.getAllHero((arr)=>{
                model.getMaxId((maxId)=>{
                    data.id = maxId + 1;
                    arr.push(data);
                    model.writeFile(arr);
                    let result = {code:200,msg:'成功'};
                    res.end(JSON.stringify(result));
                })
            })
        })
    },
}


module.exports = controller;