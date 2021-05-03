const { Client, logger } = require('@twitchapis/twitch.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Client({
  autoLogEnd: true, // Default true, optional parameter
  channels: ['moreiraffx07'],
  debug: false // Default false, optional parameter
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.name}!`);
});


client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(config.prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
     const commandFile = require(`./src/commands/${command}.js`)
     commandFile.run(client, message, args);
 } catch (err) {
 console.error('Erro:' + err);
}
});

client.login(config.token).then(() => {
    console.log(`[BOT] - Index carregada com sucesso!`);
});

client.login(config.token);