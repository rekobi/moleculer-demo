const router = require("koa-router")();


module.exports =function(app,main,broker){
    router
    .get('/',async function(ctx){
         await main.then(()=>broker.call("greeter.hello2", {} ,{nodeID: "foxtrot-26413"}))
        .then((res)=>ctx.body = res)
        .catch(err => console.error(`Error occured! ${err.message}`));
    });
    app
  .use(router.routes())
  .use(router.allowedMethods());

};