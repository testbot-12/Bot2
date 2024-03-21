const API = "https://api.botcahx.biz.id/api/textpro/logobear?apikey=Admin&text="
module.exports.config = { usePrefix: true,
	name: "bear",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SAKIBIN",
	description: "bearlogo2 logo",
	commandCategory: "text maker",
	usages: "bear<text>",
	cooldowns: 10
};
module.exports.run = async function ({ api, event, args,}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    tukhoa = args.join(" ");
    (event.type == "message_reply") ? tukhoa = event.messageReply.attachments[0].url: tukhoa = args.join(" ");
    const pathsave = __dirname + `/cache/banner.png`;
    let imageBuffer;
    api.sendMessage("🔷It's Sakibin\n🔶Please wait....", event.threadID, event.messageID);
    axios.get(`${API}${encodeURI(tukhoa)}`, {responseType: "arraybuffer"}) .then(data => {const imageBuffer = data.data;
    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
    api.sendMessage({body: `Text edit Done✅ \n🌸API by SAKIBIN😘`, attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);}).catch(error => {

          
            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`Error! An error occurred. Please try again later❎ ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
};
