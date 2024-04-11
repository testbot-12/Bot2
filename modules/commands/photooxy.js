const APIURL = global.config.ApiUrl;
const APIKEY = "SAKI-BIN-SWT56X"
module.exports.config = { usePrefix: true,
  name: "photo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Sakibin Design",
  commandCategory: "edit",
  usages: "name 1",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const qs = require("querystring");
  const moment = require("moment");
	var time= moment.tz("Asia/Dhaka").format("LLLL");
  
  const number = args[0];
  const text = args.slice(1).join("");

  if (!number || isNaN(number)) {
    return api.sendMessage("❕Use /photooxy [no.] [text]\n❕Example:\n  /photooxy 4 Sakibin\nTotal Text limit 15", event.threadID, event.messageID);
  }

  const apiEndpoint = `/api/photooxy/${number}?text=${text}&apikey=${APIKEY}`;
  const pathSave = __dirname + `/cache/photooxy256.png`;

  api.sendMessage("", event.threadID, event.messageID);

  axios
    .get(APIURL + apiEndpoint, { responseType: "arraybuffer" })
    .then((data) => {
      const imageBuffer = data.data;
      fs.writeFileSync(pathSave, Buffer.from(imageBuffer));
      api.sendMessage(
        {
    body: `🌿Photooxy Edit Done by Sakibin API🔥`,
          attachment: fs.createReadStream(pathSave),
        },
        event.threadID,
        () => fs.unlinkSync(pathSave)
      );
    })
    .catch((error) => {
      let err;
      if (error.response) {
        err = JSON.parse(error.response.data.toString());
      } else {
        err = error;
      }
      return api.sendMessage("ERROR ❌\nSAKIBIN 6x Server Busy😓🥹", event.threadID, event.messageID);
    });
};
