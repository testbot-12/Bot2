module.exports.config = { usePrefix: true,
    name: "fblout",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "SAKIBIN",
    description: "Logout ACC Bot",
    commandCategory: "admin",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event })
{
api.sendMessage("Logout ...",event.threadID,event.messageID)
api.logout()
}