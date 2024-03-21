const axios = require("axios");
 
module.exports.config = {
    name: "bot",
    version: "1",
    hasPermission: 0,
    credits: "Sakibin.Imtiaz",
    description: "Simsimi",
    usages: "Message",
    commandCategory: "...",
    cooldowns: 0
};
 
module.exports.run = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`Hi, I am Meta From Sakibin Server...`, event.threadID, event.messageID);
        }
 
        const response = await axios.get(`https://imtiaz.x-sakibin.repl.co/sim?message=${message}`);
        const respond = response.data.response;
        api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
