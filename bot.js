const mineflayer = require('mineflayer');
const {mapDownloader} = require('mineflayer-item-map-downloader');
const readline = require('readline');
const {SocksProxyAgent} = require('socks-proxy-agent');

let twerk;

let testHost = "localhost";
let mainHost = "server ip";



// let proxy =       'socks5://185.183.105.133:1080';
// const agent = new SocksProxyAgent(proxy);

const bot = mineflayer.createBot({
    host: mainHost,
    username: 'nickname',
    version: '1.20.4',
    keepAlive: true,
    brand: 'vanilla',
    viewDistance: 'normal', 
    enableTextFiltering: true,
    physicsEnabled: false,
});

bot.loadPlugin(mapDownloader);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('---bot is started---');

bot.on('login', () => {
    console.log(`[${new Date().toLocaleTimeString()}] logged in`);
});


bot.on('spawn', () => {
    console.log(`[${new Date().toLocaleTimeString()}] spawned`);
    twerk = true;

});



bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log(`[${new Date().toLocaleTimeString()}] server: ${msg}`);
    
    if (msg.toLowerCase().includes('капчу')) {
        rl.question(`[${new Date().toLocaleTimeString()}] captcha: `, (captcha) => {
            bot.chat(captcha);
        });


    }
    
   if (msg.includes('Авторизация: /login <пароль>')) setTimeout(() => {bot.chat('/l password');}, 2000);
        
   
});





bot.on('kicked', (jsonMsg) => {
    console.log(`[${new Date().toLocaleTimeString()}] --------KICKED-------`);
    console.log(`[${new Date().toLocaleTimeString()}] reason: ` + JSON.stringify(jsonMsg));

    rl.close();
    process.exit();
});

bot.on('end', (reason) => {
    console.log(`[${new Date().toLocaleTimeString()}] -----------Disconnected-----------`);
    console.log(`[${new Date().toLocaleTimeString()}] reason:` + JSON.stringify(reason));
});




process.on('SIGINT', () => {
    rl.close();
    bot.end();
    process.exit(0);
});









