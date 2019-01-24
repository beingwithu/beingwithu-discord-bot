module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    if ((!args[0]) || (args[1] && !Number(args[1]) || args[2])) return message.reply(`use    \`${config.prefix}mute @user <optional: time>\``);

    if (!message.mentions.members.first()) return message.reply("provide a @user to mute");
    const sender = message.author,
        mSender = message.member;
    const target = message.mentions.members.first();

    let muted;
    let time = 300000;
    let minutes, seconds;


    		function setChannelPerms(muted) {

    			message.guild.channels.forEach(async (channel, id) => { // disable these perms for every existing channel
    				await channel.overwritePermissions(muted, {
    					KICK_MEMBERS: false,
    					BAN_MEMBERS: false,
    					MANAGE_CHANNELS: false,
    					MANAGE_GUILD: false,
    					ADD_REACTIONS: false,
    					SEND_MESSAGES: false,
    					MANAGE_MESSAGES: false,
    					ATTACH_FILES: false,
    					CONNECT: false,
    					MUTE_MEMBERS: false,
    					MANAGE_ROLES: false
    				});
    			});
    			return undefined;
    		}


    /* unmute */
    function unmute() {

        function nowUnmute() {


            if (target.roles.find(val => val.name === "muted")) {

                muted = target.roles.find(val => val.name === "muted");

                target.removeRole(muted)
                    .then(console.log(`${target.user.username}\s mute is over\n`))
                    .then(message.channel.send(`${target.user.username}\s mute is over`))
                    .catch(console.error);

                return undefined;
            }
        }

        nowUnmute();
    }

    /* mute */
    function mute() {

        const sys = [sysop.isSysop(sender.id), sysop.ofSysop(target.id)];

        if (sys[0] === false && !mSender.hasPermission("MANAGE_NICKNAMES")) return message.reply("you must be \`Leader\` or higher to use this command");

        if (sys[1] === true || target.hasPermission("MANAGE_NICKNAMES")) {
            console.log(`\n*** ${sender.username} tried to mute ${target.user.username} ***`);
            return message.reply("a mute should never be used on another leader. If you feel like this person should be muted, contact King Penguin (Flareon) or marlboro (Glaceon)");
        }

        function createMute() { /* create the muted role, if not already done */

            message.guild.createRole({
                    name: "muted",
                    permissions: ["READ_MESSAGE_HISTORY"],
                    mentionable: true
                })
                .then(console.log("muted role has been made"))
                .then(message.reply("the role was just now created. Run this command again"))
                .catch(console.error);


			setChannelPerms(message.guild.roles.find(val => val.name === "muted"));
            return undefined;
        }


        function defineMute() { /* define the muted role */

            if (message.guild.roles.find(val => val.name === "muted")) muted = message.guild.roles.find(val => val.name === "muted");

        }


        function defineTime() { /* define the duration of time */

            if (Number(args[1])) time = args[1] * 60000;
            minutes = time / 60000;
            seconds = minutes * 100;

        }


        function nowMute() {

            /* checks if person is already muted */
            if (target.roles.find(val => val.name === "muted")) return message.reply(`${target.user.username} is already muted`); /* checks if person is already muted */

            target.addRole(muted);

            /* set time of duration */
            message.delete();
            if (minutes < 1) message.channel.send(`${target.user.username} was muted for ${seconds} seconds`);
            else message.channel.send(`${target.user.username} was muted for ${minutes} minutes`);

            setTimeout(unmute, time); /* calls unmute function in the specified time */
        }


        if (!message.guild.roles.find(val => val.name === "muted")) /* check if muted role exists */
            createMute();

        if (!muted) defineMute();
        defineTime();
        if (Number(time) && muted) nowMute();
        setChannelPerms(message.guild.roles.find(val => val.name === "muted"));

    }
    mute();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "mute",
    description: "...",
    usage: "mute @user <optional: time>"
};