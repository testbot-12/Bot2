const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

module.exports.config = {
  name: 'autolink',
  version: '1.0',
  author: 'Kshitiz',
  usePrefix: true,
  commandCategory: 'media',
  shortDescription: 'Auto video downloader for Instagram, Facebook, and TikTok',
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": "",
    "cheerio": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const threadID = event.threadID;

  if (!this.threadStates) this.threadStates = {};

  if (!this.threadStates[threadID]) {
    this.threadStates[threadID] = {};
  }

  if (event.body.toLowerCase().includes('autolink')) {
    return api.sendMessage("AutoLink is active.", threadID, event.messageID);
  }

  const urlInfo = this.checkLink(event.body);
  if (urlInfo) {
    const { url } = urlInfo;
    console.log(`Attempting to download from URL: ${url}`);
    await this.download(url, api, event);
    api.setMessageReaction("🔄", event.messageID, () => {}, true);
  }
};

module.exports.checkLink = function (message) {
  const regex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(regex);
  if (!urls) return null;

  const url = urls[0];  // Get the first URL found
  if (
    url.includes("instagram") ||
    url.includes("facebook") ||
    url.includes("fb.watch") ||
    url.includes("tiktok")
  ) {
    return { url };
  }

  return null;
};

module.exports.download = async function (url, api, event) {
  const time = Date.now();
  const path = `${__dirname}/cache/${time}.mp4`;

  try {
    if (url.includes("instagram")) {
      await this.downloadInstagram(url, api, event, path);
    } else if (url.includes("facebook") || url.includes("fb.watch")) {
      await this.downloadFacebook(url, api, event, path);
    } else if (url.includes("tiktok")) {
      await this.downloadTikTok(url, api, event, path);
    }
  } catch (err) {
    console.error(err);
    api.sendMessage("An error occurred during the download process.", event.threadID, event.messageID);
  }
};

module.exports.downloadInstagram = async function (url, api, event, path) {
  try {
    const downloadUrl = await this.getLink(url);
    await this.downloadFile(downloadUrl, path);

    if (fs.statSync(path).size / 1024 / 1024 > 25) {
      return api.sendMessage("The file is too large to be sent.", event.threadID, () => fs.unlinkSync(path), event.messageID);
    }

    const shortUrl = await shortenURL(downloadUrl);
    const messageBody = `✅ 🔗 Download URL: ${shortUrl}`;

    api.sendMessage({
      body: messageBody,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (err) {
    console.error('Error downloading Instagram video:', err);
  }
};

module.exports.downloadFacebook = async function (url, api, event, path) {
  try {
    const res = await fbDownloader(url);
    if (res.success && res.download.length > 0) {
      const videoUrl = res.download[0].url;
      await this.downloadFile(videoUrl, path);

      if (fs.statSync(path).size / 1024 / 1024 > 25) {
        return api.sendMessage("The file is too large to be sent.", event.threadID, () => fs.unlinkSync(path), event.messageID);
      }

      const shortUrl = await shortenURL(videoUrl);
      const messageBody = `✅🔗 Download URL: ${shortUrl}`;

      api.sendMessage({
        body: messageBody,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } else {
      api.sendMessage("Failed to download Facebook video.", event.threadID, event.messageID);
    }
  } catch (err) {
    console.error('Error downloading Facebook video:', err);
  }
};

module.exports.downloadTikTok = async function (url, api, event, path) {
  try {
    const res = await this.queryTikTok(url);
    const downloadUrl = res.downloadUrls[0];

    await this.downloadFile(downloadUrl, path);

    if (fs.statSync(path).size / 1024 / 1024 > 25) {
      return api.sendMessage("The file is too large to be sent.", event.threadID, () => fs.unlinkSync(path), event.messageID);
    }

    const shortUrl = await shortenURL(downloadUrl);
    const messageBody = `✅ Download URL: ${shortUrl}`;

    api.sendMessage({
      body: messageBody,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (err) {
    console.error('Error downloading TikTok video:', err);
  }
};

module.exports.getLink = function (url) {
  if (url.includes("instagram")) {
    return axios.get(`https://insta-kshitiz.onrender.com/insta?url=${encodeURIComponent(url)}`)
      .then(res => res.data.url)
      .catch(err => { throw new Error("Failed to fetch Instagram download link."); });
  } else if (url.includes("facebook") || url.includes("fb.watch")) {
    return fbDownloader(url).then(res => {
      if (res.success && res.download.length > 0) {
        return res.download[0].url;
      } else {
        throw new Error("Failed to fetch Facebook download link.");
      }
    });
  } else if (url.includes("tiktok")) {
    return this.queryTikTok(url).then(res => res.downloadUrls[0]);
  } else {
    throw new Error("Unsupported platform. Only Instagram, Facebook, and TikTok are supported.");
  }
};

module.exports.queryTikTok = async function (url) {
  try {
    const { data: pageData } = await axios.get("https://ssstik.io/en");
    const s_tt = pageData.split('s_tt = ')[1].split(',')[0];
    const { data: result } = await axios.post("https://ssstik.io/abc?url=dl", qs.stringify({
      id: url,
      locale: 'en',
      tt: s_tt
    }), {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33"
      }
    });

    const $ = cheerio.load(result);
    if (result.includes('<div class="is-icon b-box warning">')) {
      throw new Error($('p').text());
    }

    const allUrls = $('.result_overlay_buttons > a');
    const downloadUrls = allUrls.map((i, el) => $(el).attr('href')).get();

    return { downloadUrls };
  } catch (err) {
    console.error('Error in TikTok Downloader:', err);
    throw new Error("Failed to fetch TikTok download link.");
  }
};

module.exports.downloadFile = async function (url, path) {
  const response = await axios({
    method: "GET",
    url,
    responseType: "stream"
  });
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path);
    response.data.pipe(file);
    file.on('finish', resolve);
    file.on('error', reject);
  });
};

async function fbDownloader(url) {
  try {
    const { data: response1 } = await axios.post('https://snapsave.app/action.php?lang=vn', qs.stringify({ url }), {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    });

    let html;
    const evalCode = response1.replace('return decodeURIComponent', 'html = decodeURIComponent');
    eval(evalCode);
    html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');

    const $ = cheerio.load(html);
    const download = [];

    $('table tbody tr').each((i, elem) => {
      const trElement = $(elem);
      const tds = trElement.children();
      const quality = $(tds[0]).text().trim();
      const videoUrl = $(tds[2]).children('a').attr('href');
      if (videoUrl) {
        download.push({ quality, url: videoUrl });
      }
    });

    return { success: true, download };
  } catch (err) {
    console.error('Error in Facebook Downloader:', err);
    return { success: false };
  }
}

async function shortenURL(url) {
  // Your logic to shorten URLs
  return url; // Placeholder, implement your URL shortening logic
}
