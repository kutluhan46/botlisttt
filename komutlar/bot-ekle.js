let Embed = require("../embed.js")
let db = require("quick.db")
let Discord = require("discord.js")
let sc = require("starcode.js")


exports.run = (client, message, args) => {
let dön;
  

if(!message.member) return message.reply({embeds: [Embed("Yanlış kanal türü tespit edildi.", "Bir `DM` kanalında bu komut kullanılamaz.", "warn")]})
  let başvurukanal = db.fetch("botlistbaşvurukanal_" + message.guild.id)
  let log = client.channels.cache.get(db.fetch("botlistlog_" + message.guild.id))
let o = client.channels.cache.get(başvurukanal)
if(!o || !log) {

return message.reply({ embeds: [Embed("Bot eklenemedi.", "Bu sunucuda başvuru kanalı veya log kanalı ayarlanmamış. Sunucu sahibiyle iletişime geçebilirsiniz.")]}).then(msg => {
message.delete()
dön = "sa"
setTimeout(() => {
return msg.delete()
}, 5000)
})

} 
if(dön == "sa") return;
if(başvurukanal && message.channel.id !== başvurukanal) {
  return message.channel.send({ embeds: [Embed("Yanlış kanal tespit edildi.", `<#${db.fetch("botlistbaşvurukanal_" + message.guild.id)}> kanalında başvuru yapmalısınız.`, "error")]}).then(msg => {
dön = "sa"
  message.delete()
setTimeout(() => {
return msg.delete()
}, 5000)
})

}
if(dön == "sa") return;

 let ID = args[0]
 let prefix = args[1]
 if(!ID) return message.reply({ embeds: [Embed("Eksik argüman tespit edildi.", "Botunuzun ID'sini girmelisiniz.", "error")]}).then(msg => {
message.delete()
dön = "sa"
setTimeout(() => {
return msg.delete()
}, 6000)
})
  

if(dön == "sa") return;
 if(ID.length < 18 || ID.length > 18) message.reply({embeds: [Embed("Girdiğin şey bir id değil","Lütfen düzgün bir id gir","warn")]}).then(m => {
message.delete()
dön = "sa"
setTimeout(() => {
return m.delete()
}, 5000)

})
if(dön == "sa") return;

if(message.guild.members.cache.get(ID)){
if(message.guild.members.cache.get(ID).user.bot){
return message.reply({embeds: [Embed("Id'sini girdiğin bot zaten onaylanmış","Id'sini girdiğin bot zaten sunucumuzda ekli","warn")]}).then(msg => {
message.delete()
dön = "sa"
setTimeout(() => {
return msg.delete()
}, 5000)
})
if(dön == "sa") return;

} else {
return message.reply({embeds: [Embed("Girdiğin id bir bot id'si değil","Bu sunucudaki <@" + ID + "> kişisinin id'sini girmişsin.","warn")]}).then(msg => {
message.delete()
dön = "sa"
setTimeout(() => {
return msg.delete()
}, 5000)
})
}
} 


if(dön == "sa") return;
let mesıj;
const axios = require("axios")
axios({
        method: 'GET',
        url: `https://discord.com/api/v8/users/${ID}`,
        headers: {
            Authorization: `Bot ${client.token}`
        }
    }).then(function (response) {
            try {
if(response.data.message == "Unknown User") mesıj = "Böyle bir kullanıcı bulunamadı"
if(!response.data.bot) mesıj = "Girdiğin id bir bot id'si değil"
if(mesıj) return message.reply({embeds: [Embed("Bir hata oluştu",mesıj,"warn")]}).then(msg => {
message.delete()
setTimeout(() => {
return msg.delete()
}, 5000)
})
                   } catch (err) {
mesıj = "Apiden id çekişte sorun oluştur"
if(mesıj) return message.reply({embeds: [Embed("Bir hata oluştu",mesıj,"warn")]}).then(msg => {
setTimeout(() => {
return msg.delete()
}, 5000)
})

      
      }
        })

setTimeout(() => {
if(mesıj) return
  if(!prefix) return message.reply({ embeds: [Embed("Eksik argüman tespit edildi", "Bir prefix giriniz. `Not: Botunuz slash commandsa, prefixinizi / olarak giriniz.`", "error")]}).then(msg => {
message.delete()
dön = "sa"
setTimeout(() => {
return msg.delete()
}, 6000)
})
if(dön == "sa") return;

if(db.fetch(`bot_${message.author.id}`) == ID) return message.author.send("bu bot zaten onaylandı veya onaylanmayı bekliyor.")
if(db.fetch(`onay_${message.author.id}_${message.guild.id}`)) return message.author.send("Zaten bir bot eklemişsin en fazla bir bot ekleyebilirsin.")
if(prefix == "/") prefix = "Slash Command Bot"
message.channel.send("<@"+message.author.id + "> Bot başvurun alındı.").then(msg => {
setTimeout(() => {
msg.delete()
}, 5000)
})
let embed = Embed("Yeni bir bot başvurusu yapıldı","başvuru yapan: <@" + message.author.id + ">","info")
embed.addField("Botun ID'si:", ID)
embed.addField("Botun prefixi: ", prefix)
embed.setDescription(`[Ekle](https://discord.com/oauth2/authorize?scope=bot&client_id=${ID}&scope=bot&permissions=0)`)
let content = db.fetch("botlistyetkili_" + message.guild.id) ? "<@&" + db.fetch("botlistyetkili_" + message.guild.id) + `>&<@${message.author.id}>` : `<@${message.author.id}>`
let şıks = new Discord.MessageActionRow()
let şık1 = new Discord.MessageButton()
.setCustomId(`onay_${message.author.id}_${message.guild.id}`)
.setLabel("onayla")
.setEmoji("✅")
.setStyle("SUCCESS")



let şık2 = new Discord.MessageButton()
.setCustomId(`red_${message.author.id}_${message.guild.id}`)
.setLabel("reddet")
.setEmoji("❌")
.setStyle("DANGER")
şıks
.addComponents(şık1)
.addComponents(şık2)

  log.send({content: content, embeds: [embed], components: [şıks]})
db.set(`onay_${message.author.id}_${message.guild.id}`, "Bekliyor")
db.set("bot_" + message.author.id, ID)
}, 400)
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-ekle","ekle","add","add-bot","addbot"],
  permLevel: 0
};

exports.help = {
  name: "botekle",
  description: "Bot ekleme başvurusu yaparsınız.",
  usage: "yardım"
};
