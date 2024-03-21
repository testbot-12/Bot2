const API = "https://sakibin.onrender.com";

module.exports.config = { usePrefix: true,
  name: "cover",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Make a Facebook cover",
  commandCategory: "edit",
  usages: "name1,name2,email,phonenumber,adress,color",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const qs = require("querystring");
  const moment = require("moment");
	var time= moment.tz("Asia/Dhaka").format("LLLL");

const inputText = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").replace(/\|/g, ",");
  const textArray = inputText.split(",");

  const text1 = textArray[0] || "";
  const text2 = textArray[1] || "";
  const text3 = textArray[2] || "";
  const text4 = textArray[3] || "";
  const text5 = textArray[4] || "";
  const color = textArray[5] || "";
  const uid = event.senderID;
  
  if (text1 === "") {
    return api.sendMessage("❗Example:\n/cover name1,name2,email,phonenumber,adress,color", event.threadID, event.messageID);
  }

  const apiEndpoint = `/fbcover/v1?name=${text1}&color=${color}&address=${text5}&email=${text3}&subname=${text2}&sdt=${text4}&uid=${uid}`;
  const pathSave = __dirname + `/cache/server4.png`;

  api.sendMessage("", event.threadID, event.messageID);

  axios
    .get(API + apiEndpoint, { responseType: "arraybuffer" })
    .then((data) => {
      const imageBuffer = data.data;
      fs.writeFileSync(pathSave, Buffer.from(imageBuffer));
      api.sendMessage(
        {
    body: `✅Your Cover was created by Sakibin API at ${time}🔥\n➤Name:${text1} ${text2}\n➤Email:${text3}\n➤Number:${text4}\n➤Adress:${text5}\n➤Color:${color}`,
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
      return api.sendMessage("ERROR ❌\nSAKIBIN Server Busy😓", event.threadID, event.messageID);
    });
};
