module.exports.config = { usePrefix: true,
	name: "autoseen",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "SAKIBIN",
	description: "mark group",
	commandCategory: "system",
  usages: "",
	cooldowns: 0
};

module.exports.handleEvent = async ({ api, event, args }) => {
    api.markAsReadAll(() => {});
};

module.exports.run = async function({}) {}