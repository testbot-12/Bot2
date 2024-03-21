module.exports.config = { usePrefix: true,
  name: "goiadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will reply when mention any admin",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 2
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100065445284007","100065445284007",
      "100065445284007") {
    var aid = ["100065445284007","100065445284007","100065445284007"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Keep stop, Don't mention my Boss!","Don't mention Sakibin!","Please don't mention him!","Sakibin is busy to writing code!",];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }