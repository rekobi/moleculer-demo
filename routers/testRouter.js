"use strict";
const router = require("koa-router")();
const multer = require('koa-multer');


const path = require('path');
// const bodyParser = require('koa-bodyparser');
//const fs = require("fs");


module.exports =function(app,main,broker){
  var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  });

  let upload = multer({storage});
  router
  .get('/test/mixins',async function(ctx){
    await main.then(()=> broker.call("v3.ZouwbTest.mT",{useMongo : true}))
    .then((res)=> {
      console.log(res);
      return ctx.body = res;
    })
    .catch(err => console.error(`Error occured! ${err.message}`));

  })
  .get('/test',async function(ctx){
    await main.then(()=>broker.call("v3.test.rua"))
    .then((res) => ctx.xlsx('data1.xlsx', res))
    .catch(err => console.error(`Error occured! ${err.message}`));
  })                                                                                                                                                                                                                                                                                          
  .get('/test/norua',async function(ctx){
    await main.then(()=>broker.emit("order.create", {norua:"伟天魔术棒"} ,"norua"))
    .then((res)=>ctx.body = res)
    .catch(err => console.error(`Error occured! ${err.message}`));
  })
  .get('/qiniu',async function(ctx){
    await main.then(()=>broker.call("v1.qiniu.upload",{},{nodeID: "test-node"}))
    .then((res)=>{console.log(res);ctx.body = res;})
    .catch(err => console.error(`Error occured! ${err.message}`));
  })

  .get('/qiniu/rua',async function(){
    await main.then(()=>broker.emit("order.create",{rua:"伟天魔术棒"}))
    .catch(err => console.error(`Error occured! ${err.message}`));

  })

  .post('/upload',upload.single('file'),async function(ctx){
    console.log(ctx.req.file);
    await main.then(()=>broker.call("v3.test.son",{filepath: ctx.req.file.path}))
    .then((res)=>ctx.body=res)
    .catch(err => console.error(`Error occured! ${err.message}`));
    // ctx.body = {
    //   filename: ctx.req.file.filename//返回文件名
    // }; 
  })

  .post('/json',upload.single('file'),async function(ctx){
    await main.then(()=>broker.call("v3.excel.json",{filepath: path.dirname(__dirname)+'/'+ ctx.req.file.path}))
    .then((res)=>ctx.body=res)

    .catch(err => console.error(`Error occured! ${err.message}`));
    // ctx.body = {
    //   filename: ctx.req.file.filename//返回文件名
    // }; 
  });
  
  app
  .use(router.routes())
  .use(router.allowedMethods());

};