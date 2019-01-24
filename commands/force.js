module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    const sender = message.author,
        mSender = message.member;
    const target = message.mentions.members.first();

    if (!args[0]) return message.reply(`use    \`${config.prefix}force commandName>\``);


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

        /* define variables */
        let muted;
        let time = 300000;
        let minutes, seconds;

        function createMute() { /* create the muted role, if not already done */

            message.guild.createRole({
                    name: "muted",
                    permissions: ["READ_MESSAGE_HISTORY"],
                    mentionable: true
                })
                .then(console.log("muted role has been made"))
                .then(message.reply("the role was just now created. Run this command again"))
                .catch(console.error);

            return undefined;
        }


        function defineMute() { /* define the muted role */

            if (message.guild.roles.find(val => val.name === "muted")) muted = message.guild.roles.find(val => val.name === "muted");

        }


        function defineTime() { /* define the duration of time */

            if (Number(args[2])) time = args[2] * 60000;
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
    }

    /* lock */
    function lock() {

        let locked;

        function createLock() { /* create the locked role, if not already done */

            message.guild.createRole({
                    name: "locked",
                    permissions: ["READ_MESSAGE_HISTORY"],
                    mentionable: true
                })
                .then(console.log("locked role has been made"))
                .then(message.reply("the role was just now created. Run this command again"))
                .catch(console.error);

            return undefined;
        }


        function defineLock() { /* define the locked role */

            if (message.guild.roles.find(val => val.name === "locked")) locked = message.guild.roles.find(val => val.name === "locked");

        }


        function nowLock() {

            if (target.roles.find(val => val.name === "locked")) return message.reply(`${target.user.username} is already locked`); /* check if person is already locked */

            target.addRole(locked)
                .then(message.delete())
                .then(console.log(`\n${target.user.username} was locked`))
                .then(message.channel.send(`${target.user.username} was locked`))
                .catch(console.error);
        }


        if (!message.guild.roles.find(val => val.name === "locked")) /* check if locked role exists */
            createLock();

        if (!locked) defineLock();
        if (locked) nowLock();
    }


    /* kick */
    function kick() {

        if (!message.mentions.members.first()) return message.reply("provide a @user to kick");

        target.kick()
            .then(console.log(`\n${target.user.tag} has been * force * kicked from the server by ${sender.tag}`))
            .then(message.channel.send(`${target.user.username} has been kicked from the server by ${sender.tag}`))
            .catch(console.error);
    }

    /* ban */
    function ban() {

        if (!message.mentions.members.first()) return message.reply("provide a @user to ban");

        target.ban(`banned by ${sender.username}, ...`)
            .then(console.log(`\n${target.user.tag} has been * force * banned from the server by ${sender.tag}`))
            .then(message.channel.send(`${target.user.username} has been banned from the server by ${sender.tag}`))
            .catch(console.error);
    }

    /* main */
    function main() {

        const sys = [sysop.isSysop(sender.id), sysop.ofSysop(target.id)];

        if (sys[0] === false) return message.reply("you must be `\System Operator\` to use this command");
        if (sys[1] === true) return undefined;

        if (args[0] === "mute") mute();
        else if (args[0] === "lock") lock();
        else if (args[0] === "kick") kick();
        else if (args[0] === "ban") ban();
    }

    main();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "force",
    description: "...",
    usage: "force commandName"
};