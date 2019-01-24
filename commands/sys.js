module.exports.run = (client, message, args) => {
    const sysop = require("../sysop.js");

    const sender = message.author,
        target = message.mentions.members.first();

    const sys = [sysop.isSysop(sender.id), sysop.ofSysop(target.id)];

    if (sys[0] === false) return message.reply("You must be `\System Operator\` to use this command");

    message.channel.send(`\*\*Username:\*\* ${target.user.username}\n\*\*User ID:\*\* ${target.id}\n\*\*isSysop?:\*\* ${sys[0]}\n\*\*ofSysop?:\*\* ${sys[1]}`);
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "sys",
    description: "...",
    usage: "sys"
};