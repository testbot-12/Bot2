module.exports.config = {
    name: "rank",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "sakibi",
    description: "",
    commandCategory: "group",
    cooldowns: 5,
};

module.exports.run = async function ({ event, api, Currencies, Users }) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    
    const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
    const listUserID = event.participantIDs;
    const exp = [];
    
    for (const idUser of listUserID) {
        const countMess = await Currencies.getData(idUser);
        exp.push({"name": idUser.name, "exp": (typeof countMess.exp === "undefined") ? 0 : countMess.exp, "uid": idUser});
    }

    exp.sort((a, b) => b.exp - a.exp);
    const rank = exp.findIndex(info => parseInt(info.uid) === parseInt(event.senderID)) + 1;
    const infoUser = exp[rank - 1];
      
    if (rank === 0) return api.sendMessage("You are currently not in the database, so your rank cannot be determined. Please try again later.", event.threadID, event.messageID);

    const point = await this.getInfo(event.senderID, Currencies);
    
    const avatarUrl = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512`;
    const apiEndpoint = `https://sakibin.onrender.com/api/rankcard?level=${point.level}&currentxp=${point.expCurrent}&requiredxp=${point.expNextLevel}&top=${rank}&avatarurl=${encodeURIComponent(avatarUrl)}`;
    
    const response = await axios.get(apiEndpoint, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    
    return api.sendMessage(
        { body: `Name: ${name}\nTop: ${rank} \nTotal Messages: ${infoUser.exp}`, attachment: imageBuffer },
        event.threadID,
        event.messageID
    );
}
