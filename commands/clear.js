module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sys = require("../sysop.js");
    const sender = message.author,
        mSender = message.member;
    if (!args[0] || Number(args[0]) < 0 || Number(args[0] > 100 || args[1])) return message.reply(`use    \`${config.prefix}clear [amount]\``);
    let target = Number(args[0]);


    function clear() {

        if (target === 100) target -= 1;
        else target += 1;

        if (sys.isSysop(sender.id) === false && !mSender.hasPermission("MANAGE_MESSAGES")) return message.reply("you must be \`Leader\` or higher to use this command");
        else message.channel.bulkDelete(target);
    }
    clear();
};

exports.conf = {
    aliases: ["delete", "purge"]
};

exports.help = {
    name: "clear",
    description: "...",
    usage: "clear [amount]"
};