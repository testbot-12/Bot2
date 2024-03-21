
module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "0.0.1",
    credits: "MrTomXxX",
    description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const fs = require("fs");
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "got kicked out by the admin";
  
    if (type == "self-separation") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {api.sendMessage({body:`»𝗔𝗻𝘁𝗶𝗼𝘂𝘁 𝗙𝗮𝗶𝗹𝗲𝗱«\n👤@${name} কে গ্রুপ এ ফিরিয়ে আনতে পারলাম না🥺\n Bye Bye...`, attachment: fs.createReadStream(__dirname + "/cache/leaveGif/giphy.gif")},event.threadID)
            } else api.sendMessage({body:`»𝗔𝗻𝘁𝗶𝗼𝘂𝘁 𝗦𝘂𝗰𝗰𝗲𝘀𝘀«\n👤@${name} bby🥺 \n❗তুমি নিজের ইচ্ছায় গ্রুপ থেকে বের হতে পারবেন না😚 `, attachment: fs.createReadStream(__dirname + "/cache/leaveGif/happy.gif")},event.threadID);
        })
    }
}