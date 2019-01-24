const Discord = require('discord.js');
const config = require('./config.json');
const sysop = require('./sysop.js');

const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const https = require('https');
const PNG = require('pngjs3').PNG

const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast(); // for voice

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


fs.readdir('./commands/', (err, files) => {
	if (err) { console.error(err); }
	let jsfiles = files.filter(f => f.split('.')
		.pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('ERROR: you\'re missing the commands directory');
		return;
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
	console.log("	-- beingwithu-discord-bot (node)  --");
	console.log("	-- Credits to beingwithu --");
	console.log("=========================================");
	console.log("[enter your bot's name here] is online...\nOutputting responses:\n");
	client.user.setActivity(`${config.prefix}help`, { type: "PLAYING" });
});



client.on('guildMemberAdd', (member) => {
	const dir = __dirname + "/pics";
	const userName = member.user.username;
	const userID = member.user.id;

	const path_to_image = `${dir}/${userID}.png`;
	const path_to_background = `${dir}/background.png`;
	const path_to_welcome_T = `${dir}/welcome.png`;

	const imageURL = member.user.displayAvatarURL;


	function getImage(url, dest, callback) {
		const file = fs.createWriteStream(dest);
		const request = https.get(url, function(response) {
			response.pipe(file);
		})
		.on('error', function(err) {
			fs.unlink(dest);
			if (err) { callback(err); }
		});


		function imageToCircle() {
			fs.createReadStream(dest)
			.pipe(new PNG({ filterType: 4 }))
			.on('parsed', function() {
				for (let y = 0; y < this.height; y++) {
					for (let x = 0; x < this.width; x++) {
						let idx = (this.width * y + x) << 2;
						let radius = this.height / 2;
						if(y >= Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) + radius || y <= -(Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2))) + radius) {
							this.data[idx + 3] = 0;
						}
					}
				}
				this.pack().pipe(fs.createWriteStream(dest));
			});
		}
		setTimeout(imageToCircle, 1500);
	}



	function setWelcomeImage(avatar, background, w_template, callback) {
		let width = 0;
		let height = 0;
		
		gm(avatar)
		.resize(width, height)
		.write(avatar, function (err) { if (err) { callback(err); }})


		function compositeIMG() {
			gm()
			.in('-page', '+0+0')
			.in(background)
			.in('-page', '+x+y')
			.in(avatar)
			.mosaic()
			.write(w_template, function (err) { if (err) { callback(err); }})
		}
		setTimeout(compositeIMG, 1500);
	}


	function sendWelcomeImage(callback) {
		client.channels.get('[channel id here]').send(`welcome <@${userID}> to the Shadow Lord Family! Please refer to the \`#rules channel\` before you continue, and enter the code in this channel.`, {
			files: [{
				attachment: path_to_welcome_T,
				name: 'welcome.png'
			}]
		})
		.catch(console.error);


		function clear() {
			fs.unlink(path_to_welcome_T, function(err) { if (err) { callback(err); }});
			fs.unlink(path_to_image, function(err) { if (err) { callback(err); }});
			console.log("\n'welcome.png' has successfully been deleted\n");
			console.log(`\n'${userName}.png' has successfully been deleted\n`);
		}
		setTimeout(clear, 2000);
	}


	getImage(imageURL, path_to_image, err => {
		console.error(err);
		fs.unlink(path_to_image, function(err) { if (err) { console.error(err); }})
		process.exit(1);
	})


	setTimeout(setWelcomeImage, 3000, path_to_image, path_to_background, path_to_welcome_T, err => {
		console.error(err);
		fs.unlink(path_to_image, function(err) { if (err) { console.error(err); }})
		fs.unlink(path_to_welcome_T, function(err) { if (err) { console.error(err); }})
		process.exit(1);
	})


	setTimeout(sendWelcomeImage, 5000, err => {
		console.error(err);
		fs.unlink(path_to_image, function(err) { if (err) { console.error(err); }})
		fs.unlink(path_to_welcome_T, function(err) { if (err) { console.error(err); }})
		process.exit(1);
	})
});



client.on("guildMemberRemove", (member) => {
	console.log(`${member.user.username} just left [guild name here]\n`);
});



client.on("message", (message) => {
	let msg = message.content.toLowerCase();
	let args = message.content.slice(config.prefix.length).trim().split(' ');
	let command = args.shift().toLowerCase();
	let cmd;


	if (message.author.bot) return undefined;
	if (!msg.startsWith(config.prefix)) return undefined;


	try {
		if (client.commands.has(command)) { cmd = client.commands.get(command); }

		else if (client.aliases.has(command)) { cmd = client.commands.get(client.aliases.get(command)); }

		console.log(`${message.author.tag}: ${msg}\n@Channel: ${message.channel.name}\n`); // keeping track of which person used which command, for moderation purposes

		cmd.run(client, message, args);
	}
	catch (err) {
		console.log(`${message.author.tag} tried to use ${config.prefix}${command}\n`); // info on which command was triggered the error
		console.log(err);
	}
	return undefined;
});


client.login(config.token);
