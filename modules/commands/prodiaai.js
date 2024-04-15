const APIURL = global.config.ApiUrl
module.exports.config = { 
  usePrefix: true,
  name: "prodia",
  version: "1.0.",
  hasPermssion: 1,
  credits: "jameslim",
  description: "generate image from prodia",
  commandCategory: "image",
  usages: "query",
  cooldowns: 2,
};
module.exports.run = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("Wrong prompt. Try\n/prodia a cat.\nRemake by @Sakibin Sinha", threadID, messageID);
let path = __dirname + `/cache/prodia.png`;
  const poli = (await axios.get(`${APIURL}/api/prodia?prompt=${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
  api.sendMessage({
    body: "",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};
