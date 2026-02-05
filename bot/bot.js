const mineflayer = require('mineflayer');
const {mapDownloader} = require('mineflayer-item-map-downloader');
const readline = require('readline');
const {SocksProxyAgent} = require('socks-proxy-agent');
const {proxy} = require("./proxy.js")
const {password, username, host, testHost} = require("../config/config.js");


let randomProxy = Math.floor(Math.random() * proxy.length);
const agent = new SocksProxyAgent(proxy[randomProxy]);


//player stats


let bot;

let date = new Date().toLocaleTimeString();



let hp;
let xp;
let food;
let positionX;
let positionY;
let positionZ;
const pos = bot.entity.position;
let status;


function botStart(){

    bot = mineflayer.createBot({
        host: testHost,
        username: username,
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
        console.log(`[${date}] logged in`);
    });


    bot.on('spawn', () => {
        console.log(`[${date}] spawned`);
        setTimeout(() => {
            positionX = pos.x;
            positionY = pos.y;
            positionZ = pos.z;
            food = bot.food;
            hp = bot.health;
            xp = bot.experience.level;
            status = "online";

        }, 2000);




    });

    bot.on("health", () => {
        hp = bot.health;
    })

    bot.on("move", () => {
        setTimeout(() =>{
            pos = `x: ${positionX} Y: ${positionY} Z: ${positionZ}`;
        }, 10000);
    })



    bot.on('message', (jsonMsg) => {
        const msg = jsonMsg.toString();
        console.log(`[${date}] server: ${msg}`);
        
        if (msg.toLowerCase().includes('капчу')) {
            rl.question(`[${date}] captcha: `, (captcha) => {
                bot.chat(captcha);
            });


        }

        
       if (msg.includes('Авторизация: /login <пароль>')) setTimeout(() => {bot.chat('/l '+ password);}, 2000);
            
      // if(msg.includes("asd"))  bot.chat(`health: ${hp}\nxp: ${xp.level}\nfood: ${food}\n  pos: ${pos}`);
    });





    bot.on('kicked', (jsonMsg) => {
        console.log(`[${date}] --------KICKED-------`);
        console.log(`reason: ` + JSON.stringify(jsonMsg));

        rl.close();
        process.exit();
    });

    bot.on('end', (reason) => {
        console.log(`[${date}] -----------Disconnected-----------`);
        console.log(`reason:` + JSON.stringify(reason));
    });




    process.on('SIGINT', () => {
        rl.close();
        bot.end();
        status = "offline";
        process.exit(0);
    });

}


function botStop(){
    bot.quit();
}





module.exports = {botStart, botStop, getBotStats};