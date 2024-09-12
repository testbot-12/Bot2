module.exports.config = { 
  usePrefix: true,
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Command Category",
  commandCategory: "guide",
  usages: "group/ai/media/fun/love/canvas/admin/system/meme",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {  
  const category = args[0];  
  if (!category) {    
    return api.sendMessage(`━━━━━━━━━━━━\n ||      S A K I B I N      ||\n━━━━━━━━━━━━\n➤ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 LIST:\n\n📂 /help group\n📂 /help ai\n📂 /help media\n📂 /help fun\n📂 /help love\n📂 /help canvas\n📂 /help admin\n📂 /help system\n📂 /help meme\n💌 /supportgc (join our group)\n\n✅ | Use prompt for list📝`, event.threadID, event.messageID);  
  }  
  if (category === `group`) {    
    return api.sendMessage(`➣ Here is all group related Commands✨\n\n/call (call owner)\n/help\n/antiout on/off\n/group\n/tid\n/uid\n/rank\n/uid2 @mention\n/pp @mention\n/top user/money\n/balance @mention\n/bank register/check/trade`, event.threadID, event.messageID);  
  }  
  if (category === `fun`) {    
    return api.sendMessage(`➣ Commands for fun😁\n\n/point @mention\n/jail @mention\n/chor @mention\n/hack @mention\n/wanted @mention\n/trash @mention\n/slap @mention\n/pair\n/pairv2\n/pairv3\n/pairv4\n/pairv5`, event.threadID, event.messageID);  
  }  
  if (category === `love`) {    
    return api.sendMessage(`➣ Some lovely commands😚\n\n/kiss @mention\n/hug @mention\n/hugv2 @mention\n/hugv3 @mention\n/married @mention\n/marriedv2 @mention\n/marriedv3 @mention\n/marriedv4 @mention\n/marriedv5 @mention\n/confess @mention\n/couple @mention`, event.threadID, event.messageID);  
  }  
  if (category === `admin`) {    
  return api.sendMessage(
    `/self list 1\n/user ban/unban\n/out\n/listbox\n/wps (onlyadminbox)\n/linux (cmd execute)\n/shell\n/accept\n/bday\n/info`, 
    event.threadID, 
    event.messageID
  );  
}

  if (category === `ai`) {    
    return api.sendMessage(`➣ (A.i) or useful tools✨\n/removebg (reply pic)\n/meta hu\n/bot hi\n/poli a dragon\n/teach question => Answer\n/weather (city name)\n/ip (ip address)\n/wiki en (search?)\n/screenshot (url?)\n/imagine a cat\nMeta (question)`, event.threadID, event.messageID);  
  }  
  if (category === `media`) {    
    return api.sendMessage(`➣ Media Related commands🌆🎵\n\n🎶 | Audio:\n/spotify (musicname?)\n/sing (musicname)\n/x hi\n/h hi\n/say hi\n\n🖼️ | images\n/pint Naruto - 9\n/allpic\n/cdp\n/emojimix 👻 | 😱\n/cover`, event.threadID, event.messageID);  
  }  
  if (category === `system`) {    
    return api.sendMessage(`➣ System handle ⚙️⚡\n\n/uptime\n/setprefix (prefix?)\nprefix\n/restart\n/flash\n/config\n/speedtest`, event.threadID, event.messageID);  
  }  
  if (category === `canvas`) {    
    return api.sendMessage(`➣ Canvas Related commands🌆🪄\nMention or reply to a pic.\n\n/triggered @Mlmention\n/delete @mention\n/blur @mention\n/circle @mention\n/darkness @mention\n/facepalm @mention\n/invert @mention\n/pixelate @mention\n/rainbow @mention\n/wasted @mention`, event.threadID, event.messageID);  
  }  
  if (category === `meme`) {    
    return api.sendMessage(`➣ Make your own memes via text 📝\n\n/trump text\n/fblite text\n/einstein text\n/mia text\n/mark text\n/zuck text\n/leone text\n/fact text\n/khabylame text1 | text2\n/cheems text1 | text2`, event.threadID, event.messageID);  
  } 
};
