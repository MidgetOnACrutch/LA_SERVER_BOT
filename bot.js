const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = ">";

//Array for hello command
var Hello = ["Hi", 
             "Hello", 
             "Bonjour", 
             "Hola", 
             "Whats crackalackin", 
             "Wus poppin Jimbo",];

//Get the date and time for the console output
function dateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var m = today.getMinutes();
    var h = today.getHours();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    if(m < 10) {
        m='0'+m
    }

    today = ' at ' + h + ':' + m + ' on ' + mm+'/'+dd+'/'+yyyy;

    return String(today);
}

//Do this once the bot comes online
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame('Say >Help')
});


//COMANDS

//Marco Polo
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'marco')   {
    msg.channel.send('Polo!');
    console.log(msg.author.username + " was Marco" + dateTime());
  }
});

//Hello
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'hello')   {
    var rand = Hello[Math.floor(Math.random() * Hello.length)];
    msg.channel.send(rand);
    console.log(msg.author.username + " said hello" + dateTime());
  }
});

//Purge
client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    if(msg.member.roles.has("INSERT ROLE ID HERE")){
        let [purgeAmount] = msg.content.split(" ").slice(1);
        let messagecount = parseInt(purgeAmount);
        if(messagecount <= 100){
            msg.channel.fetchMessages({limit: messagecount}).then(messages => msg.channel.bulkDelete(messages));
            if(messagecount === 1){
                msg.reply(' Purged ' + purgeAmount + " message!");
                console.log(msg.author.username + " purged " + purgeAmount + " message" + dateTime());
            } else {
                msg.reply(' Purged ' + purgeAmount + " messages!");
                console.log(msg.author.username + " purged " + purgeAmount + " messages" + dateTime());
            }
        } else {
            msg.reply(' I can only purge up to 100 messages');
            console.log(msg.author.username + " tried to purge too many messages" + dateTime());
        }
    } else {
        msg.reply(' You do not have permission to do that');
        console.log(msg.author.username + " tried to purge but didn't have permision" + dateTime());
    }
}
});

//Help
client.on('message', msg => {
  if (msg.content.toLowerCase() === (prefix + "help"))   {
    msg.author.send('```Commands:\nMarco\nHello\nPurge\nScream\n\nType >Help [Command] for more info```');
    console.log(msg.author.username + " asked for help" + dateTime());
  } else if (msg.content.toLowerCase().startsWith(prefix + "help"))   {
    let [helpCommand] = msg.content.split(" ").slice(1);

    console.log(msg.author.username + " asked for help" + dateTime());

    if (helpCommand.toLowerCase() === "marco"){
        msg.author.send('```I may not be able to see you, but I can hear you.```');
    } else if (helpCommand.toLowerCase() === "hello"){
        msg.author.send('```Say hello!```');
    } else if (helpCommand.toLowerCase() === "purge"){
        msg.author.send('```Purges a specified amount of messages, now they\'re your dirty secrets. ADMIN ONLY```');
    }
  }
});


//BOT TOKEN 
client.login('INSERT BOT TOKEN HERE');