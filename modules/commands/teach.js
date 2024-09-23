const API = global.config.ApiUrl;
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

        const response = await axios.get(`${API}/sim?type=teach&ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`);
        
        if (response.data.error) {
            // Handle error response
            api.sendMessage(`❌ Error: ${response.data.error}`, event.threadID, event.messageID);
        } else if (response.data.msg && response.data.msg === "Teaching sim successfully") {
            // Handle success response
            const ask = response.data.data.ask;
            const ans = response.data.data.ans;
            api.sendMessage(`👻 Teach Successful✅\n╰─➣ Question: ${ask}\n╰─➣ Answer: ${ans}`, event.threadID, event.messageID);
        } else {
            api.sendMessage("Unexpected response from server.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
