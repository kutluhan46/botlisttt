const Discord = require("discord.js")
let prefix = require("../ayarlar.json").prefix
const cooldowns = new Discord.Collection();

module.exports = message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const client = message.client
    const commandName = args.shift()
 

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.conf.aliases && cmd.conf.aliases.includes(commandName)
        );
    if (!message.content.startsWith(prefix) || !command) return;
    if (command.guildOnly && message.channel.type == "DM")
        return message.channel.send(
            `Bu komudu sadece herhangi bir sunucuda kullanabilirsin.`
        );


    if (!cooldowns.has(command.help.name)) {
        cooldowns.set(command.help.name, new Discord.Collection());
    }

    const timestamp = cooldowns.get(command.help.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamp.has(message.author.id)) {
        const expirationTime =
            timestamp.get(message.author.id) + cooldownAmount;
        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000
            let timeleft2 = `${timeLeft}`  
     timeleft2 = timeleft2.replace(timeleft2.slice(3), "")     
     const embed = new Discord.MessageEmbed() 
                .setTitle("Cooldown aşımı tespit edildi")
                .setDescription(
                    `Bu komudu tekrar kullanabilmek için ${timeleft2} saniye bekleyin.`
                );
            return message.channel.send({ embeds: [embed] });
        }
    }
    timestamp.set(message.author.id, now);
    setTimeout(() => {
        timestamp.delete(message.author.id);
    }, cooldownAmount);
 

    try {
        command.run(client,message,args);
    } catch (e) {
        console.error(e);
        message.channel.send("Bu kodda bir hata var galiba.");
    }

};