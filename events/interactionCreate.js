const Discord = require("discord.js")
let prefix = require("../ayarlar.json").prefix
const db = require("quick.db")
const sc = require("starcode.js")
const Embed = require("../embed.js")
module.exports = async(button) => {
  
  
if(!button.isButton()) return;
if(button.customId.includes("onay_")){
let trying = button.customId.replace("onay_", "")
trying = trying.split("_")
let sahip = trying[0]
let bot = db.fetch("bot_" + sahip)
let guild = button.client.guilds.cache.get(trying[1])
let clicker = guild.members.cache.get(button.user.id)
let yetkilirol = db.fetch("botlistyetkili_" + guild.id); let x = "f`"
if(!clicker.permissions.has("ADMINISTRATOR") && !clicker.roles.cache.has(yetkilirol)) return button.reply({embeds: [Embed("Eksik yetkiler tespit edildi.", `Bu komudu kullanabilmek için <@&${yetkilirol}> rolüne veya ${x}Yönetici${x} yetkisine sahip olmalısınız.`, "error")], ephemeral: true})
if(db.fetch(`onay_${sahip}_${guild.id}`) == "onaylı") return button.reply({embeds: [Embed("Hata tespit edildi.", "Bu bot zaten onaylanmış.", "error")], ephemeral: true})
db.set(`onay_${sahip}_${guild.id}`, "onaylı")
let embed = Embed("Bot onaylandı.","<@" + sahip + "> kişisinin <@" + bot + "> botu onaylandı.","info")
button.client.channels.cache.get(db.fetch("botlistlog_" + guild.id)).send({embeds: [embed]})
sc.ghostMention(button.client, 1, sahip, db.fetch("botlistlog_" + guild.id))
} else if(button.customId.includes("red_")){
let trying = button.customId.replace("red_", "")
trying = trying.split("_")
let sahip = trying[0]
let bot = db.fetch("bot_" + sahip)
let guild = button.client.guilds.cache.get(trying[1])
let clicker = guild.members.cache.get(button.user.id)
let yetkilirol = db.fetch("botlistyetkili_" + guild.id)
if(!clicker.permissions.has("ADMINISTRATOR") && !clicker.roles.cache.has(yetkilirol)) return button.reply({embeds: [Embed("Eksik yetkiler tespit edildi.", "Sadece `Yöneticiler` veya " + yetkilirol + " Rolüne sahip kişiler bot onaylatabilir.", "error")], ephemeral: true})
if(!db.fetch(`onay_${sahip}_${guild.id}`)) return button.reply({embeds: [Embed("Hata tespit edildi.", "Bu bot zaten reddedilmiş.", "error")], ephemeral: true})
db.delete(`onay_${sahip}_${guild.id}`)
let filter = x => x.author.id == clicker.user.id
let sebep;
button.reply({embeds: [Embed("Sebebi giriniz.", "Şimdi bu botu neden reddetdiğinizin sebebini giriniz.", "info")], ephemeral: true})
button.channel.awaitMessages({filter: filter, max: 1, time: 60000, errors: ["time"]}).then(collected => {
let message = collected.first()
sebep = message.content
message.delete()
let embed = Embed("Bot reddedildi.","<@" + sahip + "> kişisinin <@" + bot + "> botu reddedildi.","info")
embed.addField("sebep:", sebep)
button.client.channels.cache.get(db.fetch("botlistlog_" + guild.id)).send({embeds: [embed]})
sc.ghostMention(button.client, 1, sahip, db.fetch("botlistlog_" + guild.id))
}).catch(err => {
sebep = "Sebep belirtilmedi"
let embed = Embed("Bot reddedildi.","<@" + sahip + "> kişisinin <@" + bot + "> botu reddedildi.","info")
embed.addField("Reddedilme sebebi:", sebep)
button.client.channels.cache.get(db.fetch("botlistlog_" + guild.id)).send({embeds: [embed]})
sc.ghostMention(button.client, 1, sahip, db.fetch("botlistlog_" + guild.id))
})
}
 

};