module.exports.config = { 
  usePrefix: true,
  name: "pair",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Hungcho edit by Hungdz30cm",
  description: "Ghep doi ngau nhien",
  commandCategory: "love", 
  usages: "[@mention]", 
  cooldowns: 15,
};

module.exports.run = async function({ api, event, args, Users, Threads, Currencies }) {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  var data = await Currencies.getData(event.senderID);
  var money = data.money
  
  var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
  var tle = tl[Math.floor(Math.random() * tl.length)];
  
  let dataa = await api.getUserInfo(event.senderID);
  let namee = await dataa[event.senderID].name
  let loz = await api.getThreadInfo(event.threadID);
  var emoji = loz.participantIDs;
  var id = emoji[Math.floor(Math.random() * emoji.length)];
  let data = await api.getUserInfo(id);
  let name = await data[id].name
  var arraytag = [];
  arraytag.push({id: event.senderID, tag: namee});
  arraytag.push({id: id, tag: name});
  var sex = await data[id].gender;
  var gender = sex == 2 ? "Male🧑" : sex == 1 ? "Female👩‍🦰" : "gay";

  let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
  fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
  let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
  fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );
  var imglove = [];
  imglove.push(fs.createReadStream(__dirname + "/noprefix/giflove.gif"));
  imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
  imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
              
  var msg = {body: `Your partner is of the same gender: ${gender}\nDual ratio: ${tle}\n`+namee+" "+"❤️"+" "+name, mentions: arraytag, attachment: imglove}
  return api.sendMessage(msg, event.threadID, event.messageID)
}
