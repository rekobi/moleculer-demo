const router = require("koa-router")();


module.exports =function(app,main,broker){
  router
  .get('/test',async function(ctx){
    await main.then(()=>broker.call("v3.test.rua", {num: 1}))
    .then((res)=>ctx.body = res)
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

  app
  .use(router.routes())
  .use(router.allowedMethods());

};