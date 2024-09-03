const axios = require("axios");
const API = global.config.ApiUrl;

module.exports.config = {
    name: "meta",
    version: "1.0",
    hasPermission: 0,
    credits: "Sakibin",
    description: "ask banglish",
    usages: "Message",
    commandCategory: "ai",
    cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`⭓ Hi, I'm Meta 2.0⚡\n⭓ My official Database created by @Sakibin Sinha 🚀`, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "continue"
                });
            }, event.messageID);
        }

        const response = await axios.get(`${API}/sim?type=ask&ask=${message}`);
        const respond = response.data.answer;
        api.sendMessage(respond, event.threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "continue"
            });
        }, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
    if (handleReply.type === "continue" && event.senderID === handleReply.author) {
        const message = event.body;

        try {
            const response = await axios.get(`${API}/sim?type=ask&ask=${message}`);
            const respond = response.data.answer;
            api.sendMessage(respond, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "continue"
                });
            }, event.messageID);
        } catch (error) {
            console.error("An error occurred:", error);
            api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
        }
    }
};
