const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "videoDownloader",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Sakibin",
  description: "Automatically downloads videos from TikTok, Facebook, and Instagram when a link is provided.",
  commandCategory: "utility",
  usages: "Send a TikTok, Facebook, or Instagram video link to download.",
  cooldowns: 3,
};

async function downloadVideo(videoUrl, threadID, api) {
  try {
    const response = await axios.get(`https://gpt-19zs.onrender.com/alldl?url=${encodeURIComponent(videoUrl)}`);
    if (response.data.status) {
      const videoData = response.data.data;
      const videoTitle = videoData.title;
      const videoDownloadUrl = videoData.low;

      const videoPath = path.resolve(__dirname, 'cache', `${videoTitle}.mp4`);
      const videoStream = fs.createWriteStream(videoPath);

      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream',
      });

      videoResponse.data.pipe(videoStream);

      videoStream.on('finish', () => {
        api.sendMessage({
          body: `Here is your downloaded video: ${videoTitle}`,
          attachment: fs.createReadStream(videoPath),
        }, threadID, () => {
          fs.unlinkSync(videoPath); // Delete video file after sending
        });
      });
    } else {
      api.sendMessage("Unable to download the video. Please ensure the link is correct.", threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: Failed to download the video.", threadID);
  }
}

module.exports.handleReaction = async function({ api, event, handleReaction }) {
  try {
    if (event.userID != handleReaction.author) return;
    const { threadID, messageID } = event;

    // Start downloading the video
    await downloadVideo(handleReaction.videoUrl, threadID, api);
    
    // Remove the reaction handler from global data
    api.unsendMessage(handleReaction.messageID);
  } catch (e) {
    console.log(e);
  }
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;

  // Check if the message contains a TikTok, Facebook, or Instagram link
  const regex = /(https?:\/\/(?:[a-zA-Z0-9-]+\.)?(tiktok\.com|facebook\.com|instagram\.com)\/[^\s]+)/gi;
  const match = body.match(regex);

  if (match) {
    const videoUrl = match[0]; // Take the first matched URL

    // Notify the user and ask them to react to the message to start the download
    api.sendMessage("Video Link ditected 🔗\nReact 👍 to download video", threadID, (error, messageInfo) => {
      if (error) return console.error(error);

      // Store the reaction handler data
      global.client.handleReaction.push({
        name: "videoDownloader",
        messageID: messageInfo.messageID,
        author: event.senderID,
        videoUrl: videoUrl
      });
    });
  }
};

module.exports.run = async function({ api, event }) {};
