module.exports.run = (client, message, args) => {
	const config = require("../config");
	const sysop = require("../sysop");


	if (sysop.check_user(message.author.id) === false) {
		return message.channel.send("you have to be \`Administrator\` to use this command");
	}

	if (args[0]) {
		return message.reply(`use    \`${config.prefix}logout\``);
	}



    function logout() {
		client.destroy()
		.then(console.log(`client was successfully destroyed by ${message.author.username}\n`))
		.catch(console.error);
    }


    function main() {
    	message.channel.send("Ending process...");
    	logout();
    }

    main();
};


exports.conf = {
    aliases: []
};


exports.help = {
    name: "logout",
    description: "no description set",
    usage: "logout"
};
