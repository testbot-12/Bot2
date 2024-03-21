module.exports.config = { usePrefix: true,
	name: "report",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "SAKIBIN",
	description: "Report bot's error to admin or comment",
	commandCategory: "group",
	usages: "[Error encountered or comments]",
	cooldowns: 5
}, module.exports.handleReply = async function({
	api: e,
	args: n,
	event: a,
	Users: s,
	handleReply: o
}) {
	var i = await s.getNameUser(a.senderID);
	switch (o.type) {
		case "reply":
			var t = global.config.SAKIBIN;
			for (let n of t) e.sendMessage({
				body: "📄Feedback from " + i + ":\n" + a.body,
				mentions: [{
					id: a.senderID,
					tag: i
				}]
			}, n, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				messageID: n.messageID,
				messID: a.messageID,
				author: a.senderID,
				id: a.threadID,
				type: "calladmin"
			})));
			break;
		case "calladmin":
			e.sendMessage({
				body: `📌Reply from Owner ${i} to you:\n❗Sakibin:\n${a.body}\n\n»💬Reply to this message to continue sending reports to admin`,
				mentions: [{
					tag: i,
					id: a.senderID
				}]
			}, o.id, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				author: a.senderID,
				messageID: n.messageID,
				type: "reply"
			})), o.messID)
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: o
}) {
	if (!a[0]) return e.sendMessage("You have not entered the content to report", n.threadID, n.messageID);
	let i = await s.getNameUser(n.senderID);
	var t = n.senderID,
		d = n.threadID;
	let r = (await o.getData(n.threadID)).threadInfo;
	var l = require("moment-timezone").tz("Asia/Dhaka").format("HH:mm:ss D/MM/YYYY");
	e.sendMessage(`📜Your Report has been sent to Admin Sakibin✅ \nTime: ${l}`, n.threadID, (() => {
		var s = global.config.SAKIBIN;
		for (let o of s) {
			let s = r.threadName;
			e.sendMessage(`👤Report from: ${i}\n🎁Box: ${s}\n🈹GC ID: ${d}\n📌ID User: ${t}\n\n❗Report: ${a.join(" ")}\n\n⏱️Time: ${l}`, o, ((e, a) => global.client.handleReply.push({
				name: this.config.name,
				messageID: a.messageID,
				author: n.senderID,
				messID: n.messageID,
				id: d,
				type: "calladmin"
			})))
		}
	}))
};