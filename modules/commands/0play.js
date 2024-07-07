const axios = require('axios');
const fs = require('fs');
const ytsearch = require('youtube-search-api');

module.exports.config = {
    name: "play",
    version: "1.0.0",
    role: 0,
    hasPermision: 0,
    credits: "cliff", //api by kim
    description: "Search and play music from music",
    commandCategory: "music",
    hasPrefix: false,
    usage: "[song name]",
    cooldowns: 5,
    usePrefix: false,
    usages: "[song name]",
    cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const keyword = encodeURIComponent(args.join(" "));
    const url = `https://music-api-91ji.onrender.com/music?keyword=${keyword}`;

    if (!keyword) return api.sendMessage("Please provide the name of the song you want to search.", event.threadID, event.messageID);

    try {
        var data = (await ytsearch.GetListByKeyword(keyword, false, 6)).items;
        if (data.length === 0) {
            api.sendMessage('No results found.', event.threadID, event.messageID);
            return;
        }
        var name = data[0].title;

        if (name) {
            const filePath = `${__dirname}/cache/${event.senderID}.mp3`;

            const downloadMusic = async (url, filePath) => {
                try {
                    const response = await axios({
                        method: 'get',
                        url: url,
                        responseType: 'stream'
                    });

                    response.data.pipe(fs.createWriteStream(filePath));

                    response.data.on('end', () => {
                        api.sendMessage({
                            body: `🎧 | Music: ${name}\n⚡ | Flash download server by fb.me/imsakibin007`,
                            attachment: fs.createReadStream(filePath),
                        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
                    });

                    response.data.on('error', (err) => {
                        console.error('Error downloading file:', err);
                        api.sendMessage("🚧 | An error occurred while downloading the music file.", event.threadID, event.messageID);
                    });
                } catch (error) {
                    console.error('Error:', error);
                    api.sendMessage("🚧 | An error occurred while processing your request.", event.threadID, event.messageID);
                }
            };

            await downloadMusic(apiUrl, filePath); // Use apiUrl to directly download the mp3 file
        } else {
            api.sendMessage("❓ | Sorry, couldn't find the requested music on music.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("🚧 | An error occurred while processing your request.", event.threadID, event.messageID);
    }
};
