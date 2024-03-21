module.exports.config = { usePrefix: true,
	name: "autoreact",
	version: "1.1.1",
	hasPermission: 0,
	credits: "John Lester",
	description: "Bot React",
	commandCategory: "No Prefix",
	cooldowns: 0,
};
const fs = require("fs");
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("hahaha") || react.includes("HAHA") || react.includes("pakyu") || react.includes("Pakyu") || react.includes("your keybord") || react.includes("pak") || react.includes("lol") || react.includes("LOL") ||  react.includes("bts") || react.includes("Bts") || react.includes("BTS") || react.includes("Kawsar") || react.includes("kawser") || react.includes("keybord hero") || react.includes("kulang") || react.includes("😆") || react.includes("😂") || react.includes("your keybord hero") || react.includes("😹") || react.includes("🤣") || 
react.includes("😅") ||
react.includes("🤤") || react.includes("😀") || react.includes("🤨") || react.includes("hasipay") || react.includes("Hasipay") || react.includes("fuck") || react.includes("fuckyou") || react.includes("vuda") || react.includes("Vuda") || react.includes("bold") || react.includes("Bold") ||  react.includes("Xuda Xudi") || react.includes("🖕") || react.includes("🤢") || react.includes("😝") || react.includes("kawser") || react.includes("Kawser") || react.includes("kauser") || react.includes("Kauser") || react.includes("script kiddie") || react.includes("trash") || react.includes("poor") || react.includes("Poor")) {
    var msg = {
				body: ""
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👻", event.messageID, (err) => {}, true)
          };
    if(react.includes("mahal") || react.includes("Mahal") || react.includes("Love") || react.includes("love") || react.includes("lab") || react.includes("lab") || react.includes("😊") || react.includes("ilove") || react.includes("Ilove") || react.includes("iLove") || react.includes("ilab") || react.includes("iLab") || react.includes("Ilab") || react.includes("labyu") || react.includes("Labyu") || react.includes("kiss") || react.includes("Kiss") || react.includes("Bot") || react.includes("kwass") || react.includes("Kwass") || react.includes("bot") || react.includes("Krass") || react.includes("crush") || react.includes("crush") || react.includes("ligawan") || react.includes("kilig") || react.includes("fuck") || react.includes("Fuck") || react.includes("Kinikilig") || react.includes("Kilig") || react.includes("😗") || react.includes("😙") || react.includes("😘") || react.includes("😚") || react.includes("ugh") || react.includes("Ugh") || react.includes("sige pa") || react.includes("Sige pa") || react.includes("sarap") || react.includes("Sarap") || react.includes("sex") || react.includes("Sex") || react.includes("☺") || react.includes("porn") || react.includes("Porn") || react.includes("kantotan") || react.includes("Kantotan") || react.includes("Iyotan") || react.includes("Iyutan") || react.includes("iyotan") || react.includes("iyutan") || react.includes("pasend") || react.includes("Pasend") || react.includes("Iyut") || react.includes("Iyot") || react.includes("iyot") || react.includes("iyut") || react.includes("eut") || react.includes("😏") || react.includes("eut") || react.includes("😍") || react.includes("🥳") || react.includes("🙂") || react.includes("send") || react.includes("Send") || react.includes("baby") || react.includes("Baby") || react.includes("babe") || react.includes("Babe") || react.includes("babi") || react.includes("Baby") || react.includes("bby") || react.includes("Bby") || react.includes("magibaz") || react.includes("Rifat") || react.includes("Picchi") || react.includes("🤓") || react.includes("😽") || react.includes("horn") || react.includes("Horn") || react.includes("abno") || react.includes("Abno") || react.includes("ovi") || react.includes("Rifat") || react.includes("Radif") || react.includes("Akash") || react.includes("Rifat") || react.includes("pepe") || react.includes("Pepe") || react.includes("🤭") || react.includes("🥰") || react.includes("💔") || react.includes("💦") || react.includes("🧸") || react.includes("😎") || react.includes("💜") || react.includes("😏") || react.includes("finger") || react.includes("Finger") || react.includes("fifinger") || react.includes("pipinger") || react.includes("Pipinger") || react.includes("pinger") || react.includes("Pinger") || react.includes("mwah") || react.includes("picchi") || react.includes("marry") || react.includes("Marry") || react.includes("😇") || react.includes("🤡")) {
      var lab = {
				body: ""
			}
			api.sendMessage(lab, threadID, messageID);
    api.setMessageReaction("💗", event.messageID, (err) => {}, true)
          };
    if(react.includes("sakit") || react.includes("Sakit") || react.includes("saket") || react.includes("Saket") || react.includes("peyn") || react.includes("Peyn") || react.includes("Pain") || react.includes("Pera") || react.includes("pera") || react.includes("kosto lage") || react.includes("Kosto Lage") || react.includes("saktan") || react.includes("Saktan") || react.includes("I'm ok") || react.includes("sasaktan") || react.includes("sad") || react.includes("Sad") || react.includes("Kosto") || react.includes("kosto") || react.includes(" 😥") || react.includes("😰") || react.includes("😨") || react.includes("😢") || react.includes(":(") || react.includes("😔") || react.includes("😞") || react.includes("depress") || react.includes("stress") || react.includes("Stress") || react.includes("Depress") || react.includes("depression") || react.includes("Depression") || react.includes("Picchi") || react.includes("picchi") || react.includes("😭")) {
      var sad = {
				body: ""
			}
			api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("🥺", event.messageID, (err) => {}, true)
          };
    if(react.includes("Assalamu alaikum") || react.includes("assalamu alaikum") || react.includes("morning") || react.includes("pakhi") || react.includes("পাখি") || react.includes("Night") || react.includes("paki")) {
      var heart = {
				body: ""
			}
			api.sendMessage(heart, threadID, messageID);
    api.setMessageReaction("🕊️", event.messageID, (err) => {}, true)
                }
        }
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
