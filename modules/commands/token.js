module.exports.config = { usePrefix: true,
	name: "token",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Get new cookie/appstate",
	commandCategory: "Tiện ích",
	usages: "",
	cooldowns: 1
};

module.exports. run = async ({ args, event, api }) => {
  const fs = require("fs-extra");
  const cheerio = global.nodemodule["cheerio"];
    if (!args[0]) return api.sendMessage(`===「 TOKEN 」===\nUser Manual:\ntoken get appstate : get new appstate\ntoken get cookie : get new cookie\ntoken updateas : refresh appstate\n====「 TOKEN 」====`, event.threadID);
  if (args[0] == "get") {
    if (args[1] == "cookie") {
      const appState = uniq(api.getAppState());
			
      const cookie = appState.reduce(function (current, _) {
				_ += `${current.key}=${current.value}; `
					return _;
			}, "");
      const path = __dirname + "/cache/cookie.txt";
      fs.writeFileSync(path, cookie);
      api.sendMessage(`Cookies have been saved to ${path} successful`, event.threadID, event.messageID);
    }
    else if ((args[1] || "").toLowerCase() == "appstate") {
      const appState = api.getAppState();
      const path = __dirname + "/cache/appState.json";
      fs.writeFileSync(path, JSON.stringify(appState, null, 2));
      api.sendMessage(`AppState saved to ${path} successful`, event.threadID, event.messageID);
    }
    else global.utils.throwError(this. config. name, event.threadID, event.messageID);
  }
  else if (["updateas"].includes(args[0].toLowerCase())) {
    const appState = api.getAppState();
      const path = __dirname + "/../../appState.json";
      fs.writeFileSync(path, JSON.stringify(appState, null, 2));
      api.sendMessage(`Refreshed appState.json file successfully`, event.threadID, event.messageID);
  }
  else if (args[0] == "logout") {
    try {
      await api.httpPost("https://www.facebook.com/security/settings/sessions/log_out_all", {
       __user: api.getCurrentUserID(),
        clear_all: false,
        ctarget: "https://www.facebook.com",
        cquick: "jsc_c_1g"
      });
      api.sendMessage(`Signed out of all devices successfully`, event.threadID, event.messageID);
    }
    catch(e) {
      return api.sendMessage(`Error! An error occurred. Please try again later`, event.threadID, event.messageID);
    }
  }
  else global.utils.throwError(this. config. name, event.threadID, event.messageID);
};
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item.key) ? false : (seen[item.key] = true);
    });
}