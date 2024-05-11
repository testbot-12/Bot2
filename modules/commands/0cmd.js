module.exports.config = { 
  usePrefix: true,
  name: "cmd",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Command Category",
  commandCategory: "guide",
  usages: "useful/media/canvas",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  
  const category = args[0];
  
  if (!category) {
    return api.sendMessage("Example:\n1./cmd useful\n2./cmd media\n3./cmd canvas", event.threadID, event.messageID);
  }

  if (category === "useful") {
    return api.sendMessage("Here's some Useful CMD", event.threadID, event.messageID);
  }
  
  if (category === "media") {
    return api.sendMessage("Here's some media related CMD", event.threadID, event.messageID);
  }
 
 if (category === "canvas") {
    return api.sendMessage("Here's some canvas related CMD", event.threadID, event.messageID);
  }
 
};
