module.exports.config = {
  usePrefix: true,
  name: "supportgc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ProCoderMew",
  description: "Add the user who runs the command to the support group.",
  commandCategory: "admin",
  usages: "..",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  const { senderID, messageID } = event;
  const threadID = "568304112847373"; // Target group thread ID
  const botID = api.getCurrentUserID();
await api.addUserToGroup(senderID, threadID);
api.sendMessage("Successfully  Added You To The Group", event.threadID, event.messageID)
}