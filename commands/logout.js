module.exports.run = (client, message, args) => {
	const config = require("../config");
	const sysop = require("../sysop");
	if (args[0]) return message.reply(`use    \`${config.prefix}logout\``);
	const sender = message.author;


    function logout() {
		const sys = sysop.isSysop(sender.id);

		if (sys === false) return message.reply("You must be \`System Operator\` to use this command");

		message.channel.send("Terminating...");

		client.destroy()
		.then(console.log(`client was successfully terminated by ${message.author.username}\n`))
		.catch(console.error);
    }
    logout();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "logout",
    description: "...",
    usage: "logout"
};