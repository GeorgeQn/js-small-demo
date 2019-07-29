const controller = require('./MVC的业务逻辑层')

/**
 * 
 * 
 *  @ {object} req 请求对象
 *  @ {object} res 响应对象
 */

 let router = function(req,res){
    if(req.url.startsWith('/assets')){
        controller.staticRescoure(req.res);
    }else
    if(req.url === '/views/add.html'){
        controller.getAddHtml(req.res);
    }else
    if(req.url === '/views/index.html'){
        controller.getIndexHtml(req.res);
    }else
    if(req.url === '/addNewHero' && req.method === 'POST'){
        controller.addNewHero(req,res)
    }
 }
//让他拿到外面
 module.exports = router;
