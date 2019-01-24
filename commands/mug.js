module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    if (!args[0] || args[1]) return message.reply(`use    \`${config.prefix}mug @user\``);

    if (!message.mentions.members.first()) return message.reply("provide the \`@user\` who you wanna mug");
    const target = message.mentions.members.first();


    function mug() {

        const thestuff = ["37 cents", "some gum", "his reeboks", "an arizona", "an iPhone", "2 quarters", "his apple watch", "his timbs", "49 cents", "some paper clips", "his god cards", "his duel disk", "his coffee", "his jelly beans", "a billion dollars"];
        let item1 = thestuff[Math.floor((Math.random() * 14))];
        let item2 = thestuff[Math.floor((Math.random() * 14))];

        while (item1 === item2) {
            item2 = thestuff[Math.floor((Math.random() * 14))];
        }

        message.channel.send(`\*\*${target.user.username}\*\* was mugged for \*\*${item1}\*\* and \*\*${item2}\*\*`);
    }
    mug();
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "mug",
    description: "...",
    usage: "mug"
};