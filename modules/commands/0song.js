const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "sing",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Hridoy",
  description: "Generate a song using the provided text and send the audio file.",
  commandCategory: "sing",
  usages: "[Song Name]",
  cooldowns: 10,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args.length === 0) {
    return api.sendMessage('⚡️Please provide a song name to generate!', threadID, messageID);
  }

  const songName = args.join(" ");

  try {
    const sentMessage = await api.sendMessage('🎧 Downloading Music...', threadID);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await api.unsendMessage(sentMessage.messageID);

    const response = await axios.get(`https://api.elianabot.xyz/tools/ytmp3.php?music=${encodeURIComponent(songName)}`);
    const { music_data } = response.data;

    //if (music_data.status !== "ok") {
      //return api.sendMessage('⚡️An error occurred while generating the song. Please try again later.', threadID, messageID);
// }

    const { link, title, duration, filesize } = music_data;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}m ${seconds}s`;
    const fileSizeMB = (filesize / (1024 * 1024)).toFixed(2);

    const audioResponse = await axios({
      url: link,
      method: 'GET',
      responseType: 'stream'
    });

    const filePath = path.resolve(__dirname, 'cache', `${title.replace(/[^a-z0-9]/gi, '_')}.mp3`);
    const writer = fs.createWriteStream(filePath);
    audioResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage({
        body: `🎶 Here is your song: ${title}\nDuration: ${formattedDuration}\nFile Size: ${fileSizeMB} MB\nEnjoy the music!`,
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath), messageID);
    });

    writer.on('error', (err) => {
      console.error(err);
      api.sendMessage("⚡️An error occurred while downloading the song. Please try again later.", threadID, messageID);
    });

  } catch (error) {
    console.error("Error generating the song:", error);
    api.sendMessage("⚡️An error occurred while generating the song. Please try again later.", threadID, messageID);
  }
};
