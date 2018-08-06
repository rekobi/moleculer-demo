"use strict";
const fs = require("fs");
const koaJson2xlsx = require("koa-json2xlsx");
const bodyParser = require("koa-bodyparser");
module.exports=function(app,main,broker){
  app
  .use(koaJson2xlsx())
  .use(bodyParser());

  let routers = fs.readdirSync(__dirname);
  routers.map((r)=>{
    if(r !== "fusion.js" && r.endsWith(".js")){
      require(__dirname+"/"+r)(app,main,broker);
    }
  });

};