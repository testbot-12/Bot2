let axios = require('axios');

let suffix = '❗'; // same prefix but with suffix at the end of the text to run noprefix.
let getToken = tex=>tex.split(/"/).find($=>/^eyJ/.test($));
let getContent = tex=>tex.split(/data\: /).filter($=>/^\{"i/.test($)).map($=>$ = JSON.parse($.replace(/\n\n$/, ''))).map($=>$.choices[0].delta.content || '').join('');
let ask = (o, b, uri = encodeURI(b))=>axios.get(`https://gptgo.ai/?q=${uri}&hl=**&hlgpt=default#gsc.tab=0&gsc.q=${uri}&gsc.page=1`).then(res=>axios.get(`https://gptgo.ai/action_ai_gpt.php?token=${getToken(res.data)}`).then(res=>o.api.sendMessage(getContent(res.data), o.event.threadID, o.event.messageID))).catch(console.log);

this.run = o=>ask(o, o.args.slice(1).join(' '));
this.handleEvent = (o, b = o.event.body)=>RegExp(`\\${suffix}`).test(b)?ask(o, b): '';
this.config = {
    name: 'bnai',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: 'gptgo.ai',
    commandCategory: 'Utilities',
    usages: '[]',
    cooldowns: 3
};
