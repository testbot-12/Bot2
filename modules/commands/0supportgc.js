module.exports.config = {
  usePrefix: true,
  name: "supportgc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ProCoderMew",
  description: "Add the user who runs the command to the support group.",
  commandCategory: "admin",
  usages: "..",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { senderID, messageID } = event;
  const threadID = "568304112847373"; // Target group thread ID
  const botID = api.getCurrentUserID();
  const out = msg => api.sendMessage(msg, senderID, messageID); // Sends message to the user who runs the command

  var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
  var participantIDs = participantIDs.map(e => parseInt(e));

  if (participantIDs.includes(parseInt(senderID))) {
    return out("You are already in the support group.");
  } else {
    var admins = adminIDs.map(e => parseInt(e.id));
    try {
      await api.addUserToGroup(parseInt(senderID), threadID);
    } catch {
      return out("Failed to add you to the support group. ❎");
    }

    if (approvalMode === true && !admins.includes(botID)) {
      return out("You've been added to the approval list. ✅");
    } else {
      return out("Successfully added you to the support group. ✅");
    }
  }
};
