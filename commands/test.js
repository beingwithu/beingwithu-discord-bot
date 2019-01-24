module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    if (args[0]) return message.reply(`use    \`${config.prefix}test\``);
    const sender = message.author;


    function test() {

        const sys = sysop.isSysop(sender.id);

        if (sys === false) return message.reply("this is a \`dev-only\` command for testing purposes only!");
        return message.reply("no other duelist can compare to you, you're the smartest and best-looking duelist in the planet, perfect in every way shape and form.");
    }
    test();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "test",
    description: "...",
    usage: "test"
};