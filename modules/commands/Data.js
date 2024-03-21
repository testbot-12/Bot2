module.exports.config = { usePrefix: true,
  name: "data",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Search information by box or user id",
  commandCategory: "group",
  usages: "[box ID] [user ID]",
  cooldowns: 5,

};
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];

module.exports.run = async ({ event, api, args, Currencies, Users, Threads }) => {
  switch (args[0]) {
    case "thread":
    case "-t":
    case "box":
      {
        let threadInfo = await api.getThreadInfo(args[1]);
        var dataThread = (await Threads.getData(args[1])).threadInfo;
        var nameThread = dataThread.threadName || "Name does not exist";
        let imgg = threadInfo.imageSrc;
        var gendernam = [];
        var gendernu = [];
        for (let z in threadInfo.userInfo) {
          var gioitinhone = threadInfo.userInfo[z].gender;
          if (gioitinhone == "MALE") {
            gendernam.push(gioitinhone)
          } else {
            gendernu.push(gioitinhone)
          }
        };
        var nam = gendernam.length;
        var nu = gendernu.length;
        let sex = threadInfo.approvalMode;
        var pd = sex == false ? "Turn off" : sex == true ? "turn on" : "Kh";
        if (imgg) {
          var callback = () => api.sendMessage({ body: `👀 Group name: ${nameThread}\n🧩 TID: ${event.threadID}\n🦋 Approval: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n🍳 Information: \n👻 ${event.participantIDs.length} members and ${dataThread.adminIDs.length} administrators.\n🤷‍♀️ Including ${nam} boy and ${nu} female.\n📩 Total number of messages: ${threadInfo.messageCount}.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
          return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
        } else { api.sendMessage(`👀 Group name: ${nameThread}\n🐧 TID: ${event.threadID}\n🦋 Approval: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Information: \n🤨 Có ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} administrators.\n🤷‍♀️ Including ${nam} boy and ${nu} female.\n📩 Total number of messages: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
        break;
      }


    case "-u":
    case "user":
      {
        var user = args[0];
        var idd = args[1];
        let data = await api.getUserInfo(idd);
        let name = data[idd].name;
        let sex = data[idd].gender;
        var gender = sex == 2 ? "male" : sex == 1 ? "Female" : "Ai";
        let isFriend = data[idd].isFriend == false ? "Link with bots " : data[idd].isFriend == true ? "Friends with BOT" : "???";
        let vanity = data[idd].vanity;
        let token = data[idd].searchTokens;
        let url = data[idd].profileUrl;
        var callback = () => api.sendMessage({ body: `Name: ${name} \nUID: ${idd}\nSex: ${gender}\nStatus: ${isFriend}\nUrl: ${vanity}\nLink FB: ${url}`, attachment: fs.createReadStream(__dirname + "/cache/2.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2.png"));
        return request(encodeURI(`https://graph.facebook.com/${idd}/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/2.png')).on('close', () => callback());
      }

    default:
      return api.sendMessage("Syntax error, use : data user/thread [ID]", event.threadID);
  }
}