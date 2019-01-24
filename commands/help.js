module.exports.run = (client, message, args) => {
    const config = require(__dirname + "/../config.json");
    const p = config.prefix;
    if (args[1]) return message.reply(`use    \`${p}help\``);

    /* incomplete file, not all commands are here. refer to original_help.js for all the commands, categorize after
       improve embed coding, i'll do this later. use this lazy way for now. im thinking make a embed.js and import it

     main help page */
    function no_args() {
        const embed = {
            title: "Help Page",
            description: `For help on a specific category, use \`${p}help categoryNameOrNumber\``,
            color: 0x9b273a,
            fields: [{
                    name: "1. Misc",
                    value: "Displays Miscellaneous Commands"
                },
                {
                    name: "2. Mod",
                    value: "Displays Moderation Commands"
                },
                {
                    name: "3. SysOp",
                    value: "Displays System Operator Commands"
                }
            ],
            footer: {
                icon_url: message.guild.iconURL,
                text: message.guild.name
            }
        };
        message.channel.send({ embed });
    }

    // misc commands page
    function misc() {
        const embed = {
            title: "Miscellaneous Commands",
            description: `Commands should start with \`${p}\``,
            color: 0x9b273a,
            fields: [{
                    name: "balance [bal]",
                    value: `\*description: Displays your balance.\nusage: \`${p}bal\`\*`
                },
                {
                    name: "checkbal [cb]",
                    value: `\*description: Displays the balance of a user.\nusage: \`${p}checkbal @user\`\*`
                },
                {
                    name: "daily [dp]",
                    value: `\*description: Rewards you points.\nusage: \`${p}daily\`\*`
                }
            ],
            footer: {
                icon_url: message.guild.iconURL,
                text: message.guild.name
            }
        };
        message.channel.send({ embed });
    }

    // moderation commands page
    function mod() {
        const embed = {
            title: "Moderation Commands",
            description: `Commands should start with \`${p}\``,
            color: 0x9b273a,
            fields: [{
                    name: "ban",
                    value: `\*description: Bans a user.\nusage: \`${p}ban @user\`\*`
                },
                {
                    name: "clear [purge, delete]",
                    value: `\*description: Purges said number of messages between 1-100.\nusage: \`${p}clear 1-100\`\*`
                },
                {
                    name: "demote",
                    value: `\*description: If no role is specified, removes all roles.\nusage: \`${p}demote @user <optional: role>\`\*`
                },
                {
                    name: "kick",
                    value: `\*description: Kicks a user.\nusage: \`${p}kick @user\`\*`
                },
                {
                    name: "lock",
                    value: `\*description: Locks a user from talking.\nusage: \`${p}lock @user\`\*`
                },
                {
                    name: "mute",
                    value: `\*description: Mutes a user, default of 5 minutes unless specified.\nusage: \`${p}mute @user <optional: time>\`\*`
                },
                {
                    name: "promote",
                    value: `\*description: Promotes a user.\nusage: \`${p}promote @user roleName\`\*`
                },
                {
                    name: "unlock",
                    value: `\*description: Unlocks a locked user.\nusage: \`${p}unlock @user\`\*`
                },
                {
                    name: "unmute",
                    value: `\*description: Unmutes a muted user.\nusage: \`${p}unmute @user\`\*`
                }
            ],
            footer: {
                icon_url: message.guild.iconURL,
                text: message.guild.name
            }
        };
        message.channel.send({ embed });
    }

    // sysop commands page
    function sysop() {
        const embed = {
            title: "System Operator Commands",
            description: `Commands should start with \`${p}\``,
            color: 0x9b273a,
            fields: [{
                    name: "addpoints [ap]",
                    value: `\*description: Adds Shadow Points to a user.\nusage: \`${p}ap @user [amount]\`\*`
                },
                {
                    name: "lockdown",
                    value: `\*description: Performs a lockdown on the server.\nusage: \`${p}lockdown [end]\`\*`
                },
                {
                    name: "kill",
                    value: `\*description: Performs server lockdown & kill.\nusage: \`${p}kill [end]\`\*`
                },
                {
                    name: "rempoints [rp]",
                    value: `\*description: Removes points from a user.\nusage: \`${p}rp @user [amount]\`\*`
                },
                {
                    name: "restart [reload]",
                    value: `\*description: Restarts the console.\nusage: \`${p}restart\`\*`
                }
            ],
            footer: {
                icon_url: message.guild.iconURL,
                text: message.guild.name
            }
        };
        message.channel.send({ embed });
    }

    if (!args[0])
        no_args();
    else if (args[0] === "misc" || args[0] == "Misc" || args[0] == "1")
        misc();
    else if (args[0] === "mod" || args[0] == "Mod" || args[0] == "2")
        mod();
    else if (args[0] === "sysop" || args[0] == "SysOp" || args[0] == "3")
        sysop();
    else
        return message.reply(`use    \`${p}help\``);
};

exports.conf = {
    aliases: ["command", "commands"]
};

exports.help = {
    name: "help",
    description: "pulls a list of commands",
    usage: "help"
};