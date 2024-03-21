const axios = require("axios");
const APIKEY = "SAKI-BIN-SWT56X";
module.exports.config = {
    name: "black",
    version: "1",
    hasPermission: 0,
    credits: "Sakibin",
    description: "Blackbox A.i",
    usages: "Message",
    commandCategory: "...",
    cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    try {
     let prompt = args.join("");
        if (!prompt) {
            return api.sendMessage(`➤ Hi, I'm MR. Black from Sakibin D-Base..🎩`, event.threadID, event.messageID);
        }

        const response = await axios.get(`https://xakibin.onrender.com/api/blackbox?prompt=${prompt}&apikey=SAKIBIN-FREE-SY6B4X`);
        const respond = response.data.message;
        api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
