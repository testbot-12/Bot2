const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const { resolve } = require('path');

async function downloadMusicFromYoutube(link, path) {
    var timestart = Date.now();
    if (!link) return 'Wrong link';
    var resolveFunc = function () { };
    var rejectFunc = function () { };
    var returnPromise = new Promise(function (resolve, reject) {
        resolveFunc = resolve;
        rejectFunc = reject;
    });
    ytdl(link, {
        filter: format =>
            format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
    }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link);
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            };
            resolveFunc(result);
        });
    return returnPromise;
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
    var path = `${__dirname}/cache/${event.senderID}.mp3`;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    try {
        var link = [],
            msg = "",
            num = 0;
        const Youtube = require('youtube-search-api');
        var data = (await Youtube.GetListByKeyword(keywordSearch, false, 6)).items;
        if (data.length === 0) return api.sendMessage('No results found.', event.threadID, event.messageID);
        var result = data[0]; // Get the first result
        var musicLink = `https://www.youtube.com/watch?v=${result.id}`;
        var musicData = await downloadMusicFromYoutube(musicLink, path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('The music you want to play is a bit too large. Please try a smaller one.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        return api.sendMessage({
            body: `🎵 | Music: ${musicData.title}\n🔖 | Channel: ${musicData.author}\n❍ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: @Sakibin Sinha`,
            attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (e) {
        return api.sendMessage('Server is busy now..!\n' + e, event.threadID, event.messageID);
    }
};
