const router = require("koa-router")();
const koaJson2xlsx = require('koa-json2xlsx');
const bodyParser = require('koa-bodyparser');
module.exports =function(app,main,broker){
  router
  .get('/test',async function(ctx){
    await main.then(()=>broker.call("v3.test.rua"))
    .then((res)=>ctx.xlsx('data1.xlsx', res))
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

  .post('/posttest',async function(ctx){
    console.log(ctx.request.body.rua);
    ctx.body = "rua";
  });

  app
  .use(koaJson2xlsx())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

};