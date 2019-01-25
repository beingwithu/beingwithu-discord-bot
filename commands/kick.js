module.exports.run = (client, message, args) => {
    const config = require("../config.json");
    const sysop = require("../sysop.js");
    const target = message.mentions.members.first();


    if (sysop.check_user(message.author.id) === false && !message.member.hasPermission("KICK_MEMBERS")) {
    	return message.reply("you must be \`Leader\` to use this command");
    }

    if (!args[0] || args[1]) {
    	return message.reply(`use    \`${config.prefix}kick @user\``);
    }

    if (!target) {
    	return message.reply("provide the \`@user\` to kick");
    }

    if ((target) && (sysop.check_user(target.user.id) === true || target.hasPermission("KICK_MEMBERS"))) {
    	return message.reply(`sorry but I can not kick another \`Leader\`. Maybe try the \`${config.prefix}force\` command or contact a server \`Administrator\``);
    }



    function kick(target) {
        target.kick().catch(console.error);
        return message.channel.send(`${target.user.username} was kicked from the server`);
    }


    function main() {
    	kick(target);
    }

    main();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "kick",
    description: "no description set",
    usage: "kick @user"
};
