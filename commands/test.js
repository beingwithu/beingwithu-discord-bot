module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");

    if (sysop.check(message.author.id) === false) {
        return message.reply("this is a \`dev-only\` command for testing purposes only!");
    }
    if (args[0]) {
    	return message.reply(`use    \`${config.prefix}test\``);
    }



    function main() {
        message.reply("no other duelist can compare to you, you're the smartest and best-looking duelist in the planet, perfect in every way shape and form.");
    }

    main();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "test",
    description: "...",
    usage: "test"
};
