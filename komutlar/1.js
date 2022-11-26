const Discord = require("discord.js");
const Embed = require("../embed.js")
let prefix = require("../ayarlar.json").prefix
exports.run = async (client, message, args) => {
    
  
let todo = args[0]
if(!todo){
const embed = Embed("Merhaba ben " + client.user.username, "Prefixim: " + require("../ayarlar.json").prefix + "\nKomutlarım şunlar:", "info")
client.commands.forEach(cmd => {
embed.addField(`${prefix}${cmd.help.name}`,`${cmd.help.description}`)
})
message.channel.send({embeds: [embed]})
} else {
const embed = Embed(prefix + todo + " komutu ile ilgili bilgi veriliyor","","info")
todo = todo.replace(prefix, "")
let eh = client.commands.get(todo)
if(!eh){
eh = client.commands.get(client.aliases.get(todo))
if(!eh) return message.reply({embeds: [Embed("Hata","Öyle bir komut bulunamadı","warn")]})
}
embed.addField("Komut adı:", prefix + eh.help.name)
embed.addField("Komut ek adları:", prefix + eh.conf.aliases.join(`, ${prefix}`))
embed.addField("Komut açıklaması:", eh.help.description)
message.reply({embeds: [embed]})
 

}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y","help","h","yardim"," "],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım Menüsünü Gösterir. (yardım'ın yanına başka bir komut yazarsanız o komutla alakalı detaylı bilgi verir.)",
  usage: "yardım"
};
