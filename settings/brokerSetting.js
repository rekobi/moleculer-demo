module.exports = {
  registry:{ 
    strategy:"CpuUsage",
    strategyOptions:{ 
      sampleCount:3,
      lowCpuUsage:10
    }
  },
  logLevel: "fatal",

  transporter: "AMQP",//设定通信方式为RabbitMQ 默认连接到'amqp://rabbitmq-server:5672'
    
  serializer: "JSON",//设定序列化格式
    
  requestTimeout: 10 * 1000,//设定超时时间
    
};