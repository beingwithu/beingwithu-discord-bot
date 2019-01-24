module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    if (!args[0] || args[1]) return message.reply(`use    \`${config.prefix}unmute @user\``);

    if (!message.mentions.members.first()) return message.reply("provide a @user to unmute");
    const sender = message.author,
        mSender = message.member;
    const target = message.mentions.members.first();


    function unmute() {

        const sys = sysop.isSysop(sender.id);

        if (sys[0] === false && !mSender.hasPermission("MANAGE_NICKNAMES")) return message.reply("you must be \`Leader\` or higher to use this command");

        if (!target.roles.find(val => val.name === "muted")) return message.reply(`${target.user.username} isn't muted`);

        let muted = message.guild.roles.find(val => val.name === "muted");

        target.removeRole(muted);
        console.log(`\n${target.user.username} was muted by ${sender.tag}\n`);
        return message.channel.send(`${target.user.username} was unlocked by ${sender.username}`);
    }
    unmute();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "unmute",
    description: "...",
    usage: "unmute @user"
};