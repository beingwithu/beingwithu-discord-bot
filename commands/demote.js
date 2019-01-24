module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sys = require("../sysop.js");
    if ((args[0] && !message.mentions.members.first()) || (!args[1])) return message.reply(`use    \`${config.prefix}demote @user roleName\``);

    const target = message.mentions.members.first();
    const sender = message.author,
        mSender = message.member;
    let role = args.slice(1).join(" ");


    function demote() {

        const sysop = sys.isSysop(sender.id);

        if (sysop === false && !mSender.hasPermission("MANAGE_ROLES")) return message.reply("you must be \`Grandmaster\` or higher to use this command");

        if (!mSender.guild.roles.find(val => val.name === `${role}`)) return message.reply("This role does not exist");

        role = mSender.guild.roles.find(val => val.name === `${role}`);

        target.removeRole(role)
            .catch(console.error);

    }
    demote();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "demote",
    description: "demotes a user",
    usage: "demote @user"
};