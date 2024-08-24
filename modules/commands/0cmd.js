module.exports.config = { 
  usePrefix: true,
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Command Category",
  commandCategory: "guide",
  usages: "useful/media/canvas",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  
  const category = args[0];
  
  if (!category) {
    return api.sendMessage("━━━━━━━━━━━━
 ||      S A K B I N      ||
 ━━━━━━━━━━━━
➤ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 LIST:

📂 /help group
📂 /help ai
📂 /help media
📂 /help fun
📂 /help love
📂 /help canvas
📂 /help admin
📂 /help system
📂 /help meme

••••Use a prompt to get list📝", event.threadID, event.messageID);
  }

  if (category === "group") {
    return api.sendMessage("➣ Here is all group related Commands✨

/call (call owner)
/help
/antiout on/off
/group
/tid
/uid
/rank
/uid2 @mention
/pp @mention
/top user/money
/balance @mention
/bank register/check/trade", event.threadID, event.messageID);
  }
  
  if (category === "fun") {
    return api.sendMessage("➣ Commands for fun😁

/point @mention
/jail @mention
/chor @mention
/hack @mention
/wanted @mention
/trash @mention
/slap @mention
/pair
/pairv2
/pairv3
/pairv4
/pairv5", event.threadID, event.messageID);
  }
 
 if (category === "love") {
    return api.sendMessage("➣ Some lovely commands😚

/kiss @mention
/hug @mention
/hugv2 @mention
/hugv3 @mention
/married @mention
/marriedv2 @mention
/marriedv3 @mention
/marriedv4 @mention
/marriedv5 @mention
/confress @mention
/couple @mention", event.threadID, event.messageID);
  }

if (category === "ai") {
    return api.sendMessage("➣ (A.i) or useful tools✨
/removebg (reply pic)
/meta hu
/bot hi
/poli a dragon
/teach question => Answer
/weather (city name)
/ip (ip address)
/wiki en (search?)
/screenshot (url?)
bot (question)", event.threadID, event.messageID);
  }

if (category === "media") {
    return api.sendMessage("➣ Media Related commands🌆🎵

🎶 | Audio:
/spotify (musicname?)
/sing (musicname)
/x hi
/h hi
/say hi

🖼️ | images
/pint Naruto - 9
/allpic
/cdp
/emojimix 👻 | 😱
/cover", event.threadID, event.messageID);
  }

if (category === "system") {
    return api.sendMessage("➣ System handle ⚙️⚡

/uptime
/setprefix (prefix?)
prefix
/restart
/flash
/config
/speedtest", event.threadID, event.messageID);
  }

if (category === "canvas") {
    return api.sendMessage("➣ Canvas Related commands🌆🪄
Mention or reply to a pic.

/triggered @Mlmention
/delete @mention
/blur @mention
/circle @mention
/darkness @mention
/facepalm @mention
/invert @mention
/pixelate @mention
/rainbow @mention
/wasted @mention", event.threadID, event.messageID);
  }

if (category === "system") {
    return api.sendMessage("➣ System handle ⚙️⚡

/uptime
/setprefix (prefix?)
prefix
/restart
/flash
/config
/speedtest", event.threadID, event.messageID);
  }

if (category === "meme") {
    return api.sendMessage("➣ Make your own memes via text 📝

/trump text
/fblite text
/einstein text
/mia text
/mark text
/zuck text
/leone text
/fact text
/khabylame text1 | text2
/cheems text1 | text2", event.threadID, event.messageID);
  }
 
};
