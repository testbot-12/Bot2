const axios = require("axios");
 
module.exports.config = {
    name: "meta",
    version: "1",
    hasPermission: 0,
    credits: "Sakibin",
    description: "Simsimi",
    usages: "Message",
    commandCategory: "...",
    cooldowns: 0
};
 
module.exports.run = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`⭓ Hi, I'm Meta 2.0⚡\n⭓ My official Database created by @Sakibin Sinha 🚀
`, event.threadID, event.messageID);
        }
 
        const response = await axios.get(`https://xakibin.onrender.com/sim?type=ask&ask=${message}`);
        const respond = response.data.answer;
        api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
