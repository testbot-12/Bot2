const APIURL = global.config.BingUrl;
  
module.exports.config = { 
  usePrefix: true,
  name: "bing",
  version: "1.0.",
  hasPermssion: 1,
  credits: "jameslim",
  description: "generate image from polination",
  commandCategory: "ai",
  usages: "(prompt?)",
  cooldowns: 2,
};
module.exports.run = async ({api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("put text/query", threadID, messageID);
  let path = __dirname + `/cache/`; // Change path for storing multiple images
  const res = await axios.get(`${APIURL}/bing?prompt=${query}`);
  const data = res.data.result;
  if (data.length < 4) return api.sendMessage("Not enough images found", threadID, messageID);
  var imgData = [];
  for (let i = 0; i < 4; i++) {
    let imgUrl = data[i];
    let imgPath = path + `image_${i}.png`;
    let getImage = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(imgPath, Buffer.from(getImage.data, 'utf-8'));
    imgData.push(fs.createReadStream(imgPath));
  }
  api.sendMessage({
    body: "Images created by bing Copilot from Sakibin A.P.I🔥",
    attachment: imgData
  }, threadID, () => {
    // Cleanup
    for (let i = 0; i < 4; i++) {
      fs.unlinkSync(path + `image_${i}.png`);
    }
  }, messageID);
};
