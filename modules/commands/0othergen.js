const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "imagine",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Hridoy",
  description: "Generate images using AI with specific modes and prompts.",
  commandCategory: "AI",
  usages: "[mode] [prompt]",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const allowedModes = ["realistic", "cinematic", "disney", "3dmodel", "cartoon"];

  if (args.length < 2) {
    return api.sendMessage("⚠️ Please provide both a mode and a prompt. Usage: imagine1 [mode] [prompt]", event.threadID);
  }

  const mode = args[0].toLowerCase();
  const prompt = args.slice(1).join(" ");

  if (!allowedModes.includes(mode)) {
    return api.sendMessage(`⚠️ Invalid mode! Allowed modes are: ${allowedModes.join(", ")}`, event.threadID);
  }

  const apiUrl = `https://api.elianabot.xyz/ai.php?mode=${encodeURIComponent(mode)}&prompt=${encodeURIComponent(prompt)}`;

  try {
    const response = await axios.get(apiUrl, { timeout: 30000 });
    const { job, status, imageUrl } = response.data;

    if (status !== "succeeded") {
      return api.sendMessage(`⚠️ The image generation failed. Status: ${status}`, event.threadID);
    }

    const imagePath = `/tmp/${job}.png`;
    const imageResponse = await axios({
      url: imageUrl,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(imagePath);
    imageResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage({
        body: `🖼️ Image generated!\n🔹 Job ID: ${job}\n🔹 Status: ${status}`,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, () => {
        fs.unlinkSync(imagePath);
      });
    });

    writer.on('error', (err) => {
      api.sendMessage("⚠️ Failed to send the image.", event.threadID);
    });

  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      api.sendMessage("⚠️ Request timed out. The server took too long to respond. Please try again later.", event.threadID);
    } else {
      api.sendMessage("⚠️ An error occurred while processing your request. Please try again later.", event.threadID);
    }
  }
};