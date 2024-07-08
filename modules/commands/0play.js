const fs = require('fs');
const ytdl = require('ytdl-core');
const Youtube = require('youtube-search-api');

async function downloadMusicFromYoutube(url, path) {
    if (!url) return 'Wrong url';

    return new Promise((resolve, reject) => {
        const stream = ytdl(url, { filter: 'audioonly' });
        const writeStream = fs.createWriteStream(path);

        stream.pipe(writeStream)
            .on('finish', () => resolve())
            .on('error', (error) => reject(error));
    });
}

module.exports.config = {
    usePrefix: true,
    name: "play",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "/play (music name?)",
    commandCategory: "Media",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.convertHMS = function (value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return (hours != '00' ? hours + ':' : '') + minutes + ':' + seconds;
};

module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage('» Please write a line!\n /play (গানের নাম?)', event.threadID, event.messageID);

    const keywordSearch = args.join(" ");
    const path = `${__dirname}/cache/${event.senderID}.mp3`;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

    try {
        const data = (await Youtube.GetListByKeyword(keywordSearch, false, 6)).items;
        if (data.length === 0) return api.sendMessage('No results found.', event.threadID, event.messageID);
        
        const result = data[0]; // Get the first result
        const url = `https://www.youtube.com/watch?v=${result.id}`;
        await downloadMusicFromYoutube(url, path);
        
        if (fs.statSync(path).size > 26214400) {
            return api.sendMessage('The music you want to play is a bit too large. Please try a smaller one.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        }

        const { title, author } = await ytdl.getInfo(url).then(info => info.videoDetails);

        return api.sendMessage({
            body: `🎵 | Music: ${title}\n🔖 | Channel: ${author.name}\n❍ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: @Sakibin Sinha`,
            attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (e) {
        return api.sendMessage('Server is busy now..!\n' + e, event.threadID, event.messageID);
    }
};
