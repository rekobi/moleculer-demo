const router = require("koa-router")();
const koaJson2xlsx = require('koa-json2xlsx');
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

  });

  // .post('/uploadxls',async function(ctx){
  //   let filePath = await ctx.formParse();
  //   let data = ctx.xlsToJson(filePath);
  //   ctx.body = data;
  // });

  app
  .use(koaJson2xlsx())
  .use(router.routes())
  .use(router.allowedMethods());

};