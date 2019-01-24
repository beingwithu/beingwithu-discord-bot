const Discord = require('discord.js');
const config = require('./config.json');
const sysop = require('./sysop.js');

const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const https = require('https');

const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast(); // for voice

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


fs.readdir('./commands/', (err, files) => {
	if (err) { console.error(err); }
	let jsfiles = files.filter(f => f.split('.')
		.pop() === 'js');
	if (jsfiles.length <= 0) {
		console.error("you are missing the commands directory");
		return undefined;
	}

	jsfiles.forEach(f => {
		let props = require(`./commands/${ f }`);
		props.fileName = f;
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});



client.on('ready', () => {
	console.log("\n=========================================");
	console.log("	-- beingwithu-discord-bot (node) --");
	console.log("	-- Credits to beingwithu --");
	console.log("=========================================");
	console.log("[bot's name here] is online...\nOutputting responses:\n");
	client.user.setActivity(`${config.prefix}help`, { type: "PLAYING" });
});



client.on('guildMemberAdd', (member) => {
	console.log(`${member.user.username} just joined [guild name here]\n`);
});



client.on("guildMemberRemove", (member) => {
	console.log(`${member.user.username} just left [guild name here]\n`);
});



client.on("message", (message) => {
	let msg = message.content.toLowerCase();
	let args = message.content.slice(config.prefix.length).trim().split(' ');
	let command = args.shift().toLowerCase();
	let unverified = message.member.roles.find(val => val.name === "unverified");
	let cmd;


	if (message.author.bot) return undefined;

	if (!msg.startsWith(config.prefix)) return undefined;


	try {
		if (client.commands.has(command)) { cmd = client.commands.get(command); }

		else if (client.aliases.has(command)) { cmd = client.commands.get(client.aliases.get(command)); }

		console.log(`${message.author.tag}: ${msg}\n@Channel: ${message.channel.name}\n`);

		cmd.run(client, message, args);
	}
	catch (err) {
		console.log(`${message.author.tag} tried to use ${config.prefix}${command}\n`);
		console.log(err);
	}
	return undefined;
});


client.login(config.token);
