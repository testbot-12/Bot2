module.exports.config = { usePrefix: true,
  name: "spotify",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joshua Sy",
  description: "Spotify link to Voice Message by Joshua Sy",
  usages: "[link]",
  commandCategory: "Other",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    let juswa = args.join(" ");
    const res = await axios.get(`https://manhict.tech/api/spDL?url=${juswa}&apikey=lgG765KO`);
    var n = res.data.result.name;
    var d = res.data.result.duration;
    var a = res.data.result.audio;
    let m = `${res.data.result.audio}`;
  
    let josh = (await axios.get(`${m}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/juswa.mp3", Buffer.from(josh, "utf-8"));
  var joshua = [];
    joshua.push(fs.createReadStream(__dirname + "/cache/juswa.mp3"));
    return api.sendMessage({body: `Name: ${n}\nDuration: ${d}`,attachment: joshua
    }, event.threadID);
}