const axios = require('axios');
const fs = require('fs');
const { spotify } = require("nayan-server");

module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermision: 0,
    credits: "Sakibin", 
    description: "Search and play music from Spotify",
    commandCategory: "spotify",
    usage: "[song name]",
    cooldowns: 5,
    usages: "[song name]",
    cooldown: 5,  
};

module.exports.run = async function ({ api, event, args }) {
    const listensearch = args.join(" ");

    if (!listensearch) return api.sendMessage("Please provide the name of the song you want to search.", event.threadID, event.messageID);

    try {
        // Set a search reaction
        api.setMessageReaction("🔍", event.messageID, (err) => {}, true);

        const response = await spotify(listensearch);
        const { title, audio } = response.data;

        if (title) {
            const filePath = `${__dirname}/cache/${event.senderID}.mp3`;
            const writeStream = fs.createWriteStream(filePath);

            const audioResponse = await axios.get(audio, { responseType: 'stream' });

            audioResponse.data.pipe(writeStream);

            writeStream.on('finish', () => {
                // Set a "done" reaction when the song is ready
                api.setMessageReaction("✅", event.messageID, (err) => {}, true);

                api.sendMessage({
                    body: `🎵 | New Spotify by Sakibin.\n\n🎶 Music: ${title}\n`,
                    attachment: fs.createReadStream(filePath),
                }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
            });
        } else {
            // Set a "not found" reaction if the song is not found
            api.setMessageReaction("❓", event.messageID, (err) => {}, true);
        }
    } catch (error) {
        console.error(error);
        // Set an error reaction instead of sending an error message
        api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);
    }
};
