const express = require('express');
const controller = require('./controller');
const router = express.Router();

//监听获取主页
router.get('/index', (req, res) => {
    controller.getIndex(req, res);
});
//监听获取编辑页面
router.get('/edit',(req,res)=>{
    controller.getEdit(req,res);
});
//给前端根据id获取原来数据的接口
router.get('/getHeroById',(req,res)=>{
    controller.getHeroById(req,res);
})
//根据id修改原来数据的接口
router.post('/editHeroById',(req,res)=>{
    controller.editHeroById(req,res);
})
module.exports = router;