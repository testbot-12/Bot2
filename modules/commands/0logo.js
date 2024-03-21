const { loadImage, createCanvas } = require("canvas");
const fs = require("fs");
const request = require("request");
const path = require("path");
const axios = require("axios");
const Canvas = require("canvas");

module.exports.config = { 
  usePrefix: true,
  name: "logo",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "SAKIBIN",
  description: "generates logo with text",
  commandCategory: "edit",
usages: "2|sakibin|Sinha|blue",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const inputText = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").replace(/\|/g, ",");
  const textArray = inputText.split(",");

  const text1 = textArray[0] || "";
  const text2 = textArray[1] || "";
  const text3 = textArray[2] || "";
  const color = textArray[3] || "";
  const text4 = textArray[4] || "";
  
  // Rest of your code...
  const lengthchar = (await axios.get("https://run.mocky.io/v3/0dcc2ccb-b5bd-45e7-ab57-5dbf9db17864")).data;
  const pathImg = path.join(__dirname, "tad", "avatar_1.png");
  const pathAva = path.join(__dirname, "tad", "avatar_2.png");

  const avtAnime = (await axios.get(encodeURI(lengthchar[text1 - 1].imgAnime), { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));

  const background = (await axios.get(`https://sakibingo--sinha-api.repl.co/ctx/logo${text1}.png`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));

  const getFont = async (url, fontName) => {
    const fontPath = path.join(__dirname, "tad", `${fontName}.ttf`);
    if (!fs.existsSync(fontPath)) {
      const fontData = (await axios.get(url, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(fontPath, Buffer.from(fontData, "utf-8"));
    }
    return fontPath;
  };

  const fontPaths = await Promise.all([
    getFont("https://github.com/Sakibin/Font/raw/main/GCatamaran-Regular.ttf", "GCatamaran-Regular"),
    getFont("https://github.com/hanakuUwU/font/raw/main/gantellinesignature-bw11b.ttf", "gantellinesignature-bw11b"),
    getFont("https://github.com/hanakuUwU/font/blob/main/UTM%20Bebas.ttf?raw=true", "UTM Bebas")
  ]);

  const a = await loadImage(pathImg);
  const ab = await loadImage(pathAva);
  const canvas = createCanvas(a.width, a.height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = `${color}`;
  ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(ab, 1500, -400, 1980, 1980);

  ctx.textAlign = "start";
  Canvas.registerFont(fontPaths[0], { family: "AmaticSC" });
  ctx.fillstyle = "#db0303"
  ctx.font = "220px AmaticSC";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 15;
ctx.shadowOffsetX = -20;
ctx.shadowOffsetY = -20;
  ctx.fillText(text2, 250, 1050);

  ctx.textAlign = "start";
  Canvas.registerFont(fontPaths[1], { family: "AmaticSC" });
  ctx.fillStyle = "#fff";
  ctx.font = "bold 100px Arial";
  ctx.fillText(text3, 500, 1150);

  ctx.save();
  Canvas.registerFont(fontPaths[2], { family: "Bebas" });
  ctx.textAlign = "end";
  ctx.fillStyle = "#f56236";
  ctx.font = "145px Arial Bold";
  ctx.fillText(text4, 2100, 870);

  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);

  return api.sendMessage(
    {
      body: `✅Logo Edit Done, Your logo Details:\n💥Logo no: ${text1}\n💥Main Name: ${text2}\n💥2nd Name/uid: ${text3}\n🌈Color: ${color}\n🌡️API: 𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮`,
      attachment: fs.createReadStream(pathImg)
    },
    event.threadID,
    () => {
      fs.unlinkSync(pathImg);
      fs.unlinkSync(pathAva);
    },
    event.messageID
  );
};
