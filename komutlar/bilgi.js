const Discord = require("discord.js");
const db = require("quick.db")
const Embed = require("../embed.js")
exports.run = async (client, message, args) => {
if(!message.member) return message.reply({embeds: [Embed("Yanlış kanal türü tespit edildi.", "Bir `DM` kanalında bu komut kullanılamaz.", "warn")]})
let log = db.fetch("botlistlog_" + message.guild.id) ? `<#${db.fetch("botlistlog_" + message.guild.id)}>` : "Kanal ayarlanmamış."
let başvurukanal = db.fetch("botlistbaşvurukanal_" + message.guild.id) ? `<#${db.fetch("botlistbaşvurukanal_" + message.guild.id)}>` : "Kanal ayarlanmamış."
let yetkilirol = db.fetch("botlistyetkili_" + message.guild.id) ? `<@&${db.fetch("botlistyetkili_" + message.guild.id)}>` : "Rol ayarlanmamış."
let embed = Embed("Sunucunun Botlist ayarları","Aşağıda verilmiştir.","info") 
if(yetkilirol == "Rol ayarlanmamış." && başvurukanal == "Kanal ayarlanmamış." && log == "Kanal ayarlanmamış.") return message.reply({embeds: [Embed("Hata","Hiçbir şey ayarlanmamış. (" + require("../ayarlar.json").prefix + "ayar komutu ile ayarlamaları yapabilirsiniz.)","warn")]}) 
embed.addField("Botlist Başvuru log: ", log)
embed.addField("Botlist Başvuru kanal: ", başvurukanal)
embed.addField("Botlist Yetkili rol: ", yetkilirol)
message.reply({embeds: [embed]})
 

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botlist-bilgi","botlistbilgi"],
  permLevel: 0
};

exports.help = {
  name: "bilgi",
  description: "Botlist sistemiyle ilgili ayarladığınız bilgilere bakarsınız.",
  usage: "yardım"
};
