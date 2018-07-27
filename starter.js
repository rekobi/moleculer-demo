const { ServiceBroker } = require("moleculer");
const Koa = require("koa");
const brokerSetting = require("./settings/brokerSetting.js");
const broker = new ServiceBroker(brokerSetting);



//broker.repl();

let started = broker.start();
    // Call service
    started.then(() => broker.call("greeter.hello2", {} ,{nodeID: "foxtrot-28814"}))
    .then(res => console.log(res))
    .then(()=>broker.stop())
    .then(()=>console.log("session closed!!!!"))
    .catch(err => console.error(`Error occured! ${err.message}`));