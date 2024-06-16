const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

module.exports.config = {
    name: "art",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Adapted from ST | Sheikh Tamim by ChatGPT",
    description: "Generate art from a replied image",
    usages: "[reply_image]",
    commandCategory: "Art Generation",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    let { threadID, messageID, messageReply } = event;

    try {
        if (!messageReply || !messageReply.attachments.length) {
            await api.sendMessage("⚠️ | Please reply to an image to use this command.", threadID, messageID);
            return;
        }

        const attachment = messageReply.attachments[0];
        if (!attachment.type || attachment.type !== 'photo') {
            await api.sendMessage("⚠️ | Please reply to a valid image to use this command.", threadID, messageID);
            return;
        }

        const imageUrl = attachment.url;
        const prompt = "glowing anime";

        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        const formData = new FormData();
        formData.append('model', "1");
        formData.append('control', "4");
        formData.append('prompt', prompt);
        formData.append('image', Buffer.from(response.data, 'binary'), 'image.jpg');

        const apiResponse = await axios.post('https://beb-anime-convert.onrender.com/generate-image', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            responseType: 'arraybuffer'
        });

        const imageBuffer = Buffer.from(apiResponse.data, 'binary');
        const cacheDir = path.join(__dirname, 'cache');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir);
        }
        const imagePath = path.join(cacheDir, `generated-image_${event.senderID}.jpg`);
        fs.writeFileSync(imagePath, imageBuffer);

        await api.sendMessage({
            attachment: fs.createReadStream(imagePath),
            body: `Generated image based on: ${prompt}`
        }, threadID, () => fs.unlinkSync(imagePath), messageID);

    } catch (error) {
        console.error('Error processing art command:', error);
        await api.sendMessage("⚠️ | Error processing art command. Please try again later.", threadID, messageID);
    }
};
