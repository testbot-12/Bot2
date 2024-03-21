const API = "https://s1--s3x-6x.repl.co/";

module.exports.config = { usePrefix: true,
  name: "graf",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TANVIR 6X",
  description: "Tanvir Design",
  commandCategory: "text edit",
  usages: "6X<text>",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const qs = require("querystring");

  const number = args[0];
  const text = args.slice(1).join("");

  if (!number || isNaN(number)) {
    return api.sendMessage("❗Use /graf [no.] [text]\n❗Example:\n  /graf 5 Sakibin\nTotal Graf limit 180...", event.threadID, event.messageID);
  }

  const apiEndpoint = `api/textpro/6xgrafart${number}?apikey=e9ffe3a5&text=${text}`;
  const pathSave = __dirname + `/cache/server.png`;

  api.sendMessage("", event.threadID, event.messageID);

  axios
    .get(API + apiEndpoint, { responseType: "arraybuffer" })
    .then((data) => {
      const imageBuffer = data.data;
      fs.writeFileSync(pathSave, Buffer.from(imageBuffer));
      api.sendMessage(
        {
          body: `🌸SAKIBIN PROJECT✅\n🖥️API From TANVIR 6X😘`,
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
