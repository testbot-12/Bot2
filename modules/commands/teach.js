const axios = require("axios");
 
module.exports.config = {
    name: "teach",
    version: "1",
    hasPermission: 1,
    credits: "Sakibin",
    description: "Teach Meta",
    usages: "Teach",
     commandCategory: "ai",
    cooldowns: 0
};
 
 
module.exports.run = async ({ api, event, args }) => {
    try {
    
        const text = args.join(" ");
        const text1 = text.substr(0, text.indexOf(" => "));
        const text2 = text.split(" => ").pop();
 
        if (!text1 || !text2) {
            return api.sendMessage(`Usage: ${global.config.PREFIX}teach hi => hello`, event.threadID, event.messageID);
        }
 
        const response = await axios.get(`https://xakibin.onrender.com/sim?type=teach&ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`);
        api.sendMessage(`👻Teach Successful✅\n╰─➣ Question: ${text1}\n╰─➣Answer: ${text2}`, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
 
