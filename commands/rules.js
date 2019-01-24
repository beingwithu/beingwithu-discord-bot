module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    if (args[0]) return message.reply(`use    \`${config.prefix}rules\``);



    function rules() {

    	const sys = sysop.isSysop(message.author.id);

    	if (sys === false && !message.member.roles.find(val => val.name === "Team Leaders")) return message.reply("you must be `Leader` to use this command");

		message.delete();

        message.channel.send({
            embed: {
                color: 0x9b273a,
                fields: [
                	{
                    	name: `\_\_In regards to the server:\_\_`,
                    	value: ` \
							> 1 - Do not ask for roles or power.\n \
							> 2 - Do not post or ask for 18+ content, and post only relevant to said channel.\n \
							> 3 - Do not advertise without permission of an Admin.\n \
							> 4 - Be respectful, do not make a comment cursing out or demeaning another member.\n \
							> 5 - Use the channels correctly, the server has many diverse channels for you to use.\n \
							> 6 - Spamming is prohibited.\n \
							> 7 - \*\*It is forbidden\*\* to make any racial or religious comments, and comments out of context.\n \
							> 8 - Any offensive comments torwards a Leader will be punished.\n \
							> 9 - Any disagreements should be talked out in the #disagreements channel, nowhere else.\n`
                    },
                    {
                    	name: `\_\_In regards to voice channels:\_\_`,
                    	value: ` \
                    		> 10 - Irritating audio is not allowed.\n \
                    		> 11 - Do not repeatedly enter a voice channel with intent to discomfort, this may result in a ban.\n`
                    },
                    {
                    	name: `\_\_After reading the rules:\_\_`,
                    	value: ` \
                    		> Enter \`paradise\` when you have finished reading the rules.\n \
                    		> \*\*Have fun and enjoy!\*\*`
                    }
				],
                footer: {
                    icon_url: client.guilds.iconURL,
                    text: client.guilds.name
                }
            }
        });
    }
    rules()
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "rules",
    description: "...",
    usage: "rules"
};