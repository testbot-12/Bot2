const request = require('request');
const fs = require('fs')
module.exports.config = { usePrefix: true,
  name: "tid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho",
  description: "Check the chat information.",
  commandCategory: "group",
  usages: "tir",
  cooldowns: 5,
  dependencies: ["request","fs"]
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
	let threadInfo = await api.getThreadInfo(event.threadID);
    
  return api.sendMessage(`${threadInfo.threadID}`, event.threadID);
}
