module.exports.config = { 
    usePrefix: true,
    name: "pint",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SAKIBIN",
    description: "Image search",
    commandCategory: "image",
    usages: "[Text]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
    const API = global.config.ApiUrl;
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");

    if (keySearch.includes("-") == false) {
        return api.sendMessage('🍁✨Please enter in the format, example: /pinterest Naruto - 6', event.threadID, event.messageID);
    }

    const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

    // Limit the number of images to 9
    if (numberSearch > 9) {
        return api.sendMessage('🚫 You can only request up to 9 images at a time.', event.threadID, event.messageID);
    }

    const res = await axios.get(`${API}/pinterest?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data.data;

    var imgData = [];
    for (var i = 0; i < numberSearch; i++) {
        let path = __dirname + `/cache/${i + 1}.jpg`;
        let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
        imgData.push(fs.createReadStream(path));
    }

    api.sendMessage({
        attachment: imgData,
        body: '➤ Here is' + numberSearch + ' Image of ' + keySearchs
    }, event.threadID, event.messageID);

    for (let i = 0; i < numberSearch; i++) {
        fs.unlinkSync(__dirname + `/cache/${i + 1}.jpg`);
    }
};
