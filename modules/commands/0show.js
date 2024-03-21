module.exports.config = {
  usePrefix: true,
  name: "show",
  version: "0.0.5",
  hasPermssion: 0,
  credits: "SAKIBIN",
  description: "Top Server!",
  commandCategory: "group",
  usages: "[thread/user/money/level]",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
  const { threadID, messageID, senderID } = event;

  ///////////////////////////////////////////
  //===== Check if there is a limit or not =====//
  if (args[1] && isNaN(args[1]) || parseInt(args[1]) <= 0)
    return api.sendMessage("list length information must be a number and not less than 0", event.threadID, event.messageID);
  var option = parseInt(args[1] || 10);
  var data, msg = "";

  ///////////////////////////////////////
  //===== Check the case =====//
  var fs = require("fs-extra");
  var request = require("request");

  // Covernt exp to level
  function expToLevel(point) {
    if (point < 0) return 0;
    return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
  }

  // Rank check module
  if (args[0] == "rank") {
    if (args[1] === undefined) {
      const user = await Users.getData(senderID);
      const exp = user.exp;
      const level = expToLevel(exp);
      return api.sendMessage(`Your rank:\nLevel: ${level}\nExp: ${exp}`, threadID, messageID);
    } else {
      const mention = Object.keys(event.mentions);
      if (mention.length == 0) {
        return api.sendMessage("Please mention a user to check their rank.", threadID, messageID);
      } else {
        const userID = mention[0];
        const user = await Users.getData(userID);
        if (!user) {
          return api.sendMessage("User not found.", threadID, messageID);
        }
        const exp = user.exp;
        const level = expToLevel(exp);
        return api.sendMessage(`Rank of mentioned user:\nLevel: ${level}\nExp: ${exp}`, threadID, messageID);
      }
    }
  }

  // Rest of the code remains unchanged

  // ... (code for handling other cases: user, thread, money)

};
