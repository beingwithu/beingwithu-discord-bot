module.exports.run = (client, message, args) => {
    const config = require("../config.json");
    const sysop = require("../sysop.js");
    const target = message.mentions.members.first();


    if (sysop.check_user(message.author.id) === false && !message.member.hasPermission("BAN_MEMBERS")) {
    	return message.reply("you must be \`Leader\` to use this command");
    }

    if (!args[0] || args[2]) {
    	return message.reply(`use    \`${config.prefix}ban @user <optional: misbehavior/raiding/repeated-offender\``);
    }

    if (!target) {
    	return message.reply("provide the \`@user\` to ban");
    }

    if ((target) && (sysop.check_user(target.user.id) === true || target.hasPermission("BAN_MEMBERS"))) {
    	return message.reply(`sorry but I can not ban another \`Leader\`. Maybe try the \`${config.prefix}force\` command or contact a server \`Administrator\``);
    }



    function ban(target, reason) {
        target.ban(reason).catch(console.error);
        return message.channel.send(`${target.user.username} was banned from the server`);
    }


    function main() {
    	let reason = "misbehavior";
    	if (args[1]) { reason = args[1]; }
    	ban(target, reason);
    }

    main();
};


exports.conf = {
    aliases: []
};


exports.help = {
    name: "ban",
    description: "no description set",
    usage: "ban @user"
};
