module.exports.config = {
    name: "log",
    eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
    version: "1.0.0",
    credits: "MrTomXxX",
    description: "Record bot activity notifications!",
    envConfig: {
      enable: true
    }
  };
  
  module.exports.run = async function ({ api, event, Users, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    let botID = api.getCurrentUserID();
    var allThreadID = global.data.allThreadID;
    for (const singleThread of allThreadID) {
      const thread = global.data.threadData.get(singleThread) || {};
      if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
    }
    
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Dhaka").format("D/MM/YYYY HH:mm:ss");
    //let nameThread = (await Threads.getData(event.threadID)).threadInfo.threadName || "Tên không tồn tại";
    let nameThread = global.data.threadInfo.get(event.threadID).threadName || "Name does not exist"; 
  
    let threadInfo = await api.getThreadInfo(event.threadID);
    nameThread =threadInfo.threadName;
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);
  
    console.log(nameThread)
  
    var formReport = "📜 | Sakibin Sir," +
      "\n 👥 Group Name: " + nameThread +
      "\n 🎁 Group Uid: " + event.threadID +
      "\n 🛡️ Action: {task}" +
      "\n 👤 User Name: " + nameUser +
      "\n 🆔 User id: " + event.author +
      "\n\n» " + time + " «",
      task = "";
    switch (event.logMessageType) {
      case "log:thread-name": {
          newName = event.logMessageData.name || "No Name";
          //task = "Người dùng thay đổi tên nhóm thành " + newName + "";
          await Threads.setData(event.threadID, {name: newName});
          break;
      }
      case "log:subscribe": {
        if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) task = "Activate✅";
        break;
      }
      case "log:unsubscribe": {
        if (event.logMessageData.leftParticipantFbId == botID) {
          if(event.senderID == botID) return;
          const data = (await Threads.getData(event.threadID)).data || {};
          data.banned = true;
          var reason = "Your group Banned for kick, Request Admin to unban❎";
          data.reason = reason || null;
          data.dateAdded = time;
          await Threads.setData(event.threadID, { data });
          global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });
  
          task = "Deactivate❎"
        }
        break;
      }
      default:
        break;
    }
  
    if (task.length == 0) return;
  
    formReport = formReport
      .replace(/\{task}/g, task);
  
    return api.sendMessage(formReport, "5683041128473731", (error, info) => {
      if (error) return logger(formReport, "Logging Event");
    });
  }
