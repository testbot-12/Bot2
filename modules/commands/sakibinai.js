const APIURL = global.config.ApiUrl;

module.exports.config = { 
  usePrefix: true,
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "...",
  commandCategory: "ai",
  usages: "prompt",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  
  // Extracting AI type and prompt from args
  const aiType = args[0];
  const prompt = args.slice(1).join(" ");

  // Checking if AI type is provided and is a name.
  if (!aiType) {
    return api.sendMessage("🎓 | List of Ai:\n/ai gpt (question)\n/ai mixtral (question)\n/ai openchat (question)\n/ai bard (question)\n/ai codellama (question)\n/ai llama (question)\n/ai gemini (question)\n❗Simple Example:\n/ai gpt write a love latter in 50 word.", event.threadID, event.messageID);
  }

  // Constructing API endpoint with correct variable names
  const apiEndpoint = `/api/allai?aiType=${aiType}&prompt=${prompt}`;
  
  // Informing user that a result is being searched
  api.sendMessage("We are searching a result...", event.threadID, event.messageID);

  axios
    .get(APIURL + apiEndpoint)
    .then((response) => {
      // Accessing the message from the response
      const message = response.data.message;
      const answer = `✅ | Reply from ${aiType}🎓\n✨ | Your answer:\n${message}\n❍𝗠𝗼𝗱𝘂𝗹𝗲 𝗯𝘆 @𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮`;
      api.sendMessage(answer, event.threadID, event.messageID); // Using answer instead of message
    })
    .catch((error) => {
      // Handling error
      let err;
      if (error.response) {
        err = JSON.parse(error.response.data.toString());
      } else {
        err = error;
      }
      return api.sendMessage("ERROR ❌\nSAKIBIN A.i Server Busy😔", event.threadID, event.messageID);
    });
};
