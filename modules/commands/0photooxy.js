const APIURL = global.config.ApiUrl;
const IMAGE_CACHE_PATH = __dirname + "/cache";
const APIKEY = "SAKI-BIN-SWT56X";
module.exports.config = {
  usePrefix: true,
  name: "photooxy",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Sakibin Design",
  commandCategory: "text edit",
  usages: "1 name",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require("axios");
  const fs = require("fs-extra");
  const moment = require("moment");
  const senderID = event.senderID;
 const inputText = args.join("");
    const Ntext = args.slice(1).join(""); 
    if (!inputText) {
      return api.sendMessage("Note: সঠিক ভাবে লিখুন। যেমন..\n/photooxy 1 Sakib", event.threadID, (messageID) => {
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
      })}
        else {
    api.sendMessage("Please wait 20 seconds while your text is being processed...⏳", event.threadID, (messageID) => {
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    })};
                      
  try {
    const time = moment.tz("Asia/Dhaka").format("LLLL");
   
    const startNumber = (parseInt(inputText) - 1) * 10 + 1;
    const endNumber = parseInt(inputText) * 10;
    const imgData = [];
    for (let i = startNumber; i <= endNumber; i++) {
      const apiEndpoint = `/api/photooxy/${i}?text=${Ntext}&apikey=${APIKEY}`;

      const imagePath = `${IMAGE_CACHE_PATH}/${senderID}_${i}.png`;
      const response = await axios.get(APIURL + apiEndpoint, { responseType: 'arraybuffer' });
      fs.writeFileSync(imagePath, Buffer.from(response.data, 'utf-8'));
      imgData.push(fs.createReadStream(imagePath));
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    
    }
  
    await api.sendMessage({
      attachment: imgData,
      body: `🔥Here is your edited image (${startNumber} to ${endNumber})\n🖥️API and CMD Make by @Sakibin to ${time}`,
    }, event.threadID, event.messageID);
    
 //Clean up files from cache...
    for (let i = startNumber; i <= endNumber; i++) {
      fs.unlinkSync(`${IMAGE_CACHE_PATH}/${senderID}_${i}.png`);
    }
  } catch (error) {
    console.error("Sakibin System Busy...❌", error);
      }
};
