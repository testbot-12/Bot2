module.exports.config = { usePrefix: true,
  name: "goiadminbow",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100088425487809","100088425487809",
      "100088425487809") {
    var aid = ["100088425487809","100088425487809","100088425487809"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Uff🥵,kicu hote na hotei @nayem😐 nayem akhon busy☠️inbox koro 😒"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }