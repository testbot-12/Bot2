module.exports.config = {
    usePrefix: true,
    name: "call",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Add my owner into this group.",
    commandCategory: "admin",
    usages: "..",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID } = event;
    const botID = api.getCurrentUserID();
    const out = msg => api.sendMessage(msg, threadID, messageID);
    const targetUserID = "100065445284007"; // The user you want to add to the group

    var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
    var participantIDs = participantIDs.map(e => parseInt(e));

    if (participantIDs.includes(parseInt(targetUserID))) {
        return out("My Boss already in this group✅\n⚡Just mention @𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮 ");
    } else {
        var admins = adminIDs.map(e => parseInt(e.id));
        try {
            await api.addUserToGroup(parseInt(targetUserID), threadID);
        } catch {
            return out("Failed to add the user to the group. ❎");
        }
        
        if (approvalMode === true && !admins.includes(botID)) {
            return out("My Boss Sakibin has been added to the approved list✅");
        } else {
            return out("Successfully added My Boss Sakibin to your Group✅");
        }
    }
}
