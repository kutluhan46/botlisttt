const Discord = require("discord.js");
const db = require("quick.db")
const Embed = require("../embed.js")
exports.run = async (client, message, args) => {
  let todo = args[0] 
if(!todo || todo !== "log" && todo !== "başvurukanal" && todo !== "yetkilirol") message.reply({embeds: [Embed("Eksik veya hatalı argüman tespit edildi.","`log, başvurukanal, yetkilirol` seçeneklerinden birini kullanınız","warn")]})
if(!message.member) return message.reply({embeds: [Embed("Yanlış kanal türü tespit edildi.", "Bir `DM` kanalında bu komut kullanılamaz.", "warn")]})
if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [Embed("Eksik yetkiler tespit edildi.", "Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")]})

if(todo == "log"){
let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
if(!log) return message.reply({ embeds: [Embed("Eksik argüman tespit edildi.", "Bir log kanalı etiketleyin veya bir log kanalı ID'si girin.", "warn")]})
 

  db.set("botlistlog_" + message.guild.id, log.id) 
  message.reply({ embeds: [Embed("İşlem başarılı", `Log kanalınız başarı ile <#${log.id}> olarak ayarlandı` , "warn")]})
} else if(todo == "başvurukanal"){
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
if(!channel) return message.reply({ embeds: [Embed("Eksik argüman tespit edildi.", "Bir başvuru kanalı etiketleyin veya bir başvuru kanalı ID'si girin.", "warn")]})

db.set("botlistbaşvurukanal_" + message.guild.id, channel.id)
message.reply({embeds: [Embed("İşlem başarılı",`Botlist başvuru kanalı başarı ile <#${channel.id}> olarak ayarlandı.`,"info")]})

} else if(todo == "yetkilirol"){
let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
if(!role) return message.reply({ embeds: [Embed("Eksik argüman tespit edildi.", "Bir yetkili rolü veya yetkili rolü ID'si girmelisiniz.", "warn")]})
db.set("botlistyetkili_" + message.guild.id, role.id)
  message.reply({ embeds: [Embed("İşlem başarı ile tamamlandı.", `Botlist yetkili rolünüz <@&${role.id}> olarak ayarlandı`, "warn")]})

}
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botlist-ayar","botlistayar","botlist","ayarla","botlist-ayarları"],
  permLevel: 0
};

exports.help = {
  name: "ayar",
  description: "Botlist sistemiyle alakalı ayarları yaparsınız.",
  usage: "yardım"
};
