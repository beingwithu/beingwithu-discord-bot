module.exports.run = (client, message, args) => {
    const config = require("../config.json");
    const sysop = require("../sysop.js");
    const target = message.mentions.members.first();


	if (sysop.check(message.author.id) === false && !message.member.hasPermission("MANAGE_ROLES")) {
    	return message.reply("you must be \`Moderator\` to use this command");
    }

	if (!args[0] || args[3]) {
    	return message.reply(`use    \`${config.prefix}mute @user <optional: time>\``);
    }

	if (args[0] === "setup-config" && args[1] !== "true") {
    	return message.reply(`the setup-config command is    \`${config.prefix}mute setup-config true\``);
    }

    if (args[0] !== "setup-config" && !target) {
    	return message.reply("provide a \`@user\` to mute");
    }

    if ((args[0] !== "setup-config") && (target && sysop.check(target.id) === true || target.hasPermission("MANAGE_ROLES"))) {
    	return message.reply(`you can not mute another \`Moderator\`. If you feel like this user should be muted, use the \`${config.prefix}force mute\` command or contact the server \`Administrator\`.`);
    }

    if ((args[0] !== "setup-config") && (target && target.roles.find(val => val.name === "muted"))) {
    	return message.reply(`${target.user.username} is already muted.`);
    }

	if (Number(args[1]) && Number(args[1]) < 5) {
		return message.reply("the mute duration should be at least 5 minutes. Leave this part empty for a default timer of 5 minutes.");
	}



    function setChannelPerms(state) {
    	const muted = message.guild.roles.find(val => val.name === "muted");
		if (state !== "true") { return message.reply(`\`${config.prefix}mute setup-config true\``); }

    	message.guild.channels.forEach(async (channel, id) => {
			await channel.overwritePermissions(muted, {
				SEND_MESSAGES: false,
				MANAGE_MESSAGES: false,
				ATTACH_FILES: false,
				CONNECT: false,
			})
			.catch(console.error);
		});
		return message.channel.send("Done setting up the configurations! You may now use the \`mute\` command.");
	}


	function unmute(target, muted) {
		target.removeRole(muted).catch(console.error);
		return message.channel.send(`$<@{target.user.id}> can now chat again!`);
	}


	function mute(target, muted, time) {
		target.addRole(muted).catch(console.error);
		message.channel.send(`${target.user.username} has been muted for ${time / 60000} minutes`);
	}


	function createMute() {
		if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
			return message.channel.send("Seems like I don't have the permission (manage roles) to do so :cry:");
		}
		message.guild.createRole({
			name: "muted",
			permissions: ["READ_MESSAGE_HISTORY"],
			mentionable: true
		})
		.catch(console.error);

		message.channel.send(`All done! Try doing \`${config.prefix}mute setup-config true\``);
	}


	function main() {
		let time = 5 * 60000;
		let muted_role;

		if (Number(args[1])) { time = args[1] * 60000; }

		if (args[0] === "setup-config") {
			setChannelPerms(args[1])
		}
		if (!message.guild.roles.find(val => val.name === "muted")) {
			message.channel.send("Oops, seems like there is no \`muted\` role for this server. Allow me to make one for you!");
			createMute();
		}
		else if (target) {
			muted_role = message.guild.roles.find(val => val.name === "muted");
			mute(target, muted_role, time);
			setTimeout(unmute, time, target, muted_role);
		}
	}
	main();
};


exports.conf = {
    aliases: []
};

exports.help = {
    name: "mute",
    description: "...",
    usage: "mute @user <optional: time>"
};