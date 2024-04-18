const APIUrl = global.config.ApiUrl;

module.exports.config = { usePrefix: true,
    name: "allpic",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "SAKIBIN",
    description: "See all photos on bot",
    commandCategory: "random-img",
    usages: "image",
    cooldowns: 0,
    envConfig: {
      cooldownTime: 1200000
    }
  };
  module.exports.onLoad = async function () {
        console.log("===========» API Sakibin «===========");
  }
  module.exports.run = async function ({ event, api , args, Users}){
    const fs = require("fs");
    let name1 = await Users.getNameUser(event.senderID)
    var name = ["Anime", "Chitanda", "Cospay", "Vi Girl", "Cute Girl", "Jimmy", "Kana", "Huyen", "Kurumi", "Le Bong", "Ngoc Dam", "Loli", "Trinh", "Rem", "Sagiri", "Siesta", "Umaru", "Wallpaper"]
    var b = name.length;
    var page = 1;
    page = parseInt(args[0]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 10;
    var numPage = Math.ceil(b / limit);
    var msg = `🎗️ | List of Anime ✨\n\n`;
    var x = 1;
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= b) break;
        msg += `👻 ${i+1}. ${name[i]}\n`;
    }
    msg += `\n➡️Page (${page}/${numPage})\n❗Use ${global.config.PREFIX}${this.config.name} <number of pages>\n🎗️ ${name1} reply a number order to choose photos!`;
    return api.sendMessage(msg, event.threadID, (error, info) =>
    {
      global.client.handleReply.push(
      {
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "choose"
      });
    }, event.messageID);
  }
  module.exports.handleReply = async function ({ event, api , args, handleReply, Users}){
    const axios = require("axios");
    
             if(event.body == "1"){
         var url = `${APIUrl}/images/anime?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "2"){
         var url = `${APIUrl}/images/chitanda?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "3"){
         var url = `${APIUrl}/images/cosplay?apikey=SAKIBIN-FREE-SY6B4X`
}
          else if(event.body == "4"){
          var url = `${APIUrl}/images/gaixinhvn?apikey=SAKIBIN-FREE-SY6B4X`
}
          else if(event.body == "5"){
          var url = `${APIUrl}/images/girl?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "6"){
          var url = `${APIUrl}/images/jimmy?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "7"){
          var url = `${APIUrl}/images/kana?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "8"){
          var url = `${APIUrl}/images/khanhhuyen?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "9"){
         var url = `${APIUrl}/images/kurumi?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "10"){
         var url = `${APIUrl}/images/lebong?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "11"){
         var url = `${APIUrl}/images/lnd?apikey=SAKIBIN-FREE-SY6B4X`
}
        else if(event.body == "12"){
          var  url = `${APIUrl}/images/loli?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "13"){
          var  url = `${APIUrl}/images/ngoctrinh?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "14"){
         var url = `${APIUrl}/images/rem?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "15"){
         var url = `${APIUrl}/images/sagiri?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "16"){
          var url = `${APIUrl}/images/siesta?apikey=SAKIBIN-FREE-SY6B4X`
}
         else if(event.body == "17"){
           var url = `${APIUrl}/images/umaru?apikey=SAKIBIN-FREE-SY6B4X`
}

    switch(handleReply.type){
    case "choose":{
    api.unsendMessage(handleReply.messageID);
    const res = await axios.get(url);
    const fs = require ("fs");
    let name = await Users.getNameUser(event.senderID)
    const data = res.data.data;
    const download = (await axios.get(data, {
        responseType: "stream"
    })).data;
    return api.sendMessage({body: `✅ | Here's Your photo ${name} This!!!`, attachment : download}, event.threadID)
}
    }
}
