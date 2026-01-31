const mineflayer = require('mineflayer');
const {mapDownloader} = require('mineflayer-item-map-downloader');
const readline = require('readline');


let twerk;



const bot = mineflayer.createBot({
    host: '2b2t.org.ru',
    username: 'TakUma',
    version: '1.20.4',
    keepAlive: true,
    brand: 'vanilla',
    viewDistance: 'normal', 
    enableTextFiltering: true,
    physicsEnabled: false
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
    //bot.chat(">qq all");
    twerk = true;
    //twerByPass();

});



bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log(`[${new Date().toLocaleTimeString()}] server: ${msg}`);
    
    if (msg.toLowerCase().includes('капчу')) {
        rl.question(`[${new Date().toLocaleTimeString()}] captcha: `, (captcha) => {
            bot.chat(captcha);
        });


    }
    
    if (msg.includes('Проверка пройдена')) setTimeout(() => {bot.chat('/l 00113361000');}, 10000);
        
   
});





bot.on('kicked', (jsonMsg) => {
    console.log(`[${new Date().toLocaleTimeString()}] --------KICKED-------`);
    console.log(`[${new Date().toLocaleTimeString()}] reason: ${jsonMsg}`);

    rl.close();
    process.exit();
});

bot.on('end', (reason) => {
    console.log(`[${new Date().toLocaleTimeString()}] -----------Disconnected-----------`);
    console.log(`[${new Date().toLocaleTimeString()}] reason: ${reason}`);
});




process.on('SIGINT', () => {
    rl.close();
    bot.end();
    process.exit(0);
});





function twerByPass(){
    while(twerk){
        setInterval(() =>{
            bot.setControlState('sneak', true);
            bot.setControlState('sneak', false);
        }, 100 * Math.random() * 80);
    }
}






