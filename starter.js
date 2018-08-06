"use strict";
const { ServiceBroker } = require("moleculer");
const Koa = require("koa");
const fusion = require("./routers/fusion.js");
const brokerSetting = require("./settings/brokerSetting.js");
const app = new Koa();
const broker = new ServiceBroker(brokerSetting);
// const routes_inject = require("./routers/testRouter.js");
broker.repl();

let main = broker.start();
// routes_inject(app,main,broker);
fusion(app,main,broker);
app.listen(8017);