const fs = require("fs");
module.exports.config = { usePrefix: true,
name: "Fuckyou",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "dungkon",
	description: "Fuck your mother",
	commandCategory: "No command marks needed",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("fuckyou")==0 || (event.body.indexOf("pakyu")==0 || (event.body.indexOf("tanginamo")==0 || (event.body.indexOf("tanga")==0)))) {
		var msg = {
				body: "🖕",
				attachment: fs.createReadStream(__dirname + `/noprefix/fuckyou.mp4`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}