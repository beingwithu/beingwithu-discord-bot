module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    if (!args[0] || args[1]) return message.reply(`use    \`${config.prefix}kick @user\``);

    if (!message.mentions.members.first()) return message.reply("provide the \`@user\` to kick");
    const target = message.mentions.members.first();
    const sender = message.author,
        mSender = message.member;


    function kick() {

        const sys = [sysop.isSysop(sender.id), sysop.ofSysop(target.id)];

        if (sys[0] === false && !mSender.hasPermission("KICK_MEMBERS")) return message.reply("you must be \`Grandmaster\` or higher to use this command");

        if (sys[1] === true || target.hasPermission("KICK_MEMBERS") || target.id === "450207245611958273" /* Bot ID */ ) {
            console.log(`\n*** ${sender.tag} has attempted to kick ${target.user.tag} from the server ***`);
            return message.reply(`you may not kick ${target.user.username}, this attempt has been reported`);
        }

        target.kick()
            .then(console.log(`\n${target.user.tag} has been kicked from the server by ${sender.tag}`))
            .then(message.channel.send(`${target.user.username} has been kicked from the server by ${sender.tag}`))
            .catch(console.error);
    }
    kick();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: 'kick',
    description: '...',
    usage: 'kick @user'
};