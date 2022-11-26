const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');
exports.run = async (client, message, args) => {

let ehi = 0
if(ayarlar.owners){
ayarlar.owners.forEach(owner => {
if(message.author.id !== owner) return;
ehi += 1
})
if(ehi !== 1 && ayarlar.owner !== message.author.id) return message.channel.send("Sen benim yapımcılarımdan değilsin")
} else {
if(ayarlar.owner !== message.author.id) return message.channel.send("Sen benim yapımcım değilsin")
}
    let codein = args.join(" ");
   try {
    let code = eval(codein)
    if (codein.length < 1) return message.channel.send('Bir kod girmelisin !')
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    message.channel.send({embeds: [embed]})
  } catch(e) {
    let embed2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Hata', "\`\`\`js\n"+e+"\n\`\`\`")
    message.channel.send({embeds: [embed2]});
  }
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>'
  }