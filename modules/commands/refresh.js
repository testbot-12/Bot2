module.exports.config = { usePrefix: true,
	name: "refresh",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Load lại toàn bộ thông tin của nhóm",
	commandCategory: "Hệ Thống",
	cooldowns: 500
};

module.exports.run = async ({ event, api, Threads }) => {
    const threadInfo = await api.getThreadInfo(event.threadID);
	await Threads.setData(event.threadID, { name: threadInfo.name, threadInfo });
	global.data.threadInfo.set(parseInt(event.threadID), threadInfo);
    return api.sendMessage("Matagumpay na i-refresh ang impormasyon ng grupo!", event.threadID, event.messageID);
}