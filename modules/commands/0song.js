const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermision: 0,
    credits: "sakibin", 
    description: "Search and play music",
    commandCategory: "music",
    usage: "[song name]",
    cooldowns: 5,
    usages: "[song name]",
    cooldown: 5,  
};

module.exports.run = async function ({ api, event, args }) {
    const listensearch = encodeURIComponent(args.join(" "));
    const apiUrl = `ekotapay.xyz:2243/sing=${listensearch}`;

    if (!listensearch) return api.sendMessage("Music এর নাম লিখবো কিডা?", event.threadID, event.messageID);

    try {
        // Set 🔍 reaction when download starts
        api.setMessageReaction("🔍", event.messageID, (err) => {}, true);

        const response = await axios.get(apiUrl);
        const { audio_url, title } = response.data;

        if (audio_url) {
            const filePath = `${__dirname}/cache/${event.senderID}.mp3`;
            const writeStream = fs.createWriteStream(filePath);

            const audioResponse = await axios.get(audio_url, { responseType: 'stream' });

            audioResponse.data.pipe(writeStream);

            writeStream.on('finish', () => {
                api.sendMessage({
                    body: `🎵 | Music Found.\n\n🎶 Music: ${title}\n`,
                    attachment: fs.createReadStream(filePath),
                }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
                
                // Set ✅ reaction when download is done
                api.setMessageReaction("✅", event.messageID, (err) => {}, true);
            });
        } else {
            api.sendMessage("❓ | Sorry, couldn't find the requested music.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("Failed❗", event.threadID);
    }
};
