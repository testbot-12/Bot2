module.exports.config = { usePrefix: true,
	name: "databot",
	version: "0.0.1-beta",
	hasPermssion: 0,
	credits: "HelyT",
	description: "Search information by id of box or user",
	commandCategory: "group",
	usages: "data",
	cooldowns: 5,
	
};
const request = require('request')
const fs = require('fs')
module.exports.run = async ({ event, api, args, client, Currencies, Users, utils, __GLOBAL, reminder }) => {	
var input=args[0]
  if (input==""){api.sendMessage("BIf you haven't entered your card, please use the following cards:")}
  else if (input=="box"){
  	var box = args[0];
  	var id = args[1];
  	let threadInfo = await api.getThreadInfo(id)
  	let sex = threadInfo.approvalMode;
  var pd = sex == false ? "Shutting down" : sex == true ? "On" : "Not Thread";
var name = threadInfo.name;
			let countMess = threadInfo.messageCount;
			var emoji = threadInfo.emoji;
let num = threadInfo.adminIDs.length;
var boy = [];
    var nu = [];
    for (let i in threadInfo.userInfo) {
        var gei = threadInfo.userInfo[i].gender;
        if(gei == "MALE"){boy.push(i)}
        else if(gei == "FEMALE"){nu.push(i)}
    }
  var callback = () => api.sendMessage({body:`Box name: ${name} \nTID: ${id}\nEmoji: ${emoji}\nNumber of messages: ${countMess}\nAdmin: ${num}\n Number of member: ${threadInfo.participantIDs.length}\nmale: ${boy.length}\nFemale: ${nu.length}\nGroup approval: ${pd}`,attachment: fs.createReadStream(__dirname + "/cache/2.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2.png"));
  	return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/2.png')).on('close',() => callback());
	}
else if (input=="user"){
	var user = args[0];
	var idd = args[1];
	let data = await api.getUserInfo(idd);
		let name = data[idd].name;
let sex = data[idd].gender;
var gender = sex == 2 ? "male" : sex == 1 ? "Female" : "Ai";
let isFriend = data[idd].isFriend == false ? "Not yet friends with BOT" : data[idd].isFriend == true ? "Link with BOT" : "???";
				let vanity = data[idd].vanity;
				let token = data[idd].searchTokens;
				let url = data[idd].profileUrl;
  var callback = () => api.sendMessage({body:`Name: ${name} \nUID: ${idd}\nSex: ${gender}\nStatus: ${isFriend}\nUrl: ${vanity}\nLink FB: ${url}`,attachment: fs.createReadStream(__dirname + "/cache/2.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2.png"));
  	return request(encodeURI(`https://graph.facebook.com/${idd}/picture?width=512&height=512&access_token=170918394587449|sONjQBBNs316xVD31T-yuL4jfyc`)).pipe(fs.createWriteStream(__dirname+'/cache/2.png')).on('close',() => callback());

	}
}