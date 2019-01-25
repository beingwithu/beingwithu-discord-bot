module.exports.run = (client, message, args) => {
	const config = require("../config.json");
    const sysop = require("../sysop.js");


    if (sysop.check_user(message.author.id) === false && !message.member.hasPermission("MANAGE_MESSAGES")) {
    	return message.reply("you must be \`Moderator\` to use this command");
	}

	if ((!args[0]) || (Number(args[0]) < 1 || Number(args[0] > 100)) || (args[1])) {
		return message.reply(`use    \`${config.prefix}clear amount\``);
	}



    function clear(messages) {
		message.channel.bulkDelete(messages);
    }


    function main() {
    	let target = Number(args[0]);

		if (target === 100) { target -= 1; }
		else { target += 1; }
		clear(target);
	}

	main();
};


exports.conf = {
    aliases: ["purge"]
};


exports.help = {
    name: "clear",
    description: "no description set",
    usage: "clear amount"
};
