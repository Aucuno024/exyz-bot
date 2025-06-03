const { WebcastPushConnection } = require('tiktok-live-connector');
const db = require("better-sqlite3")("db.db")
const { Client, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel, GuildScheduledEventStatus, AllowedMentionsTypes, AttachmentBuilder, ActivityType } = require("discord.js");
const Discord = require("discord.js")
let tiktok
let l = db.prepare("SELECT idUser FROM Users;").all()
console.log("Liste des Streameurs : " + l)
let isAlreadyOnLive = []
for(let i = 0; i < l.length; i++)
{
    isAlreadyOnLive.push(0)
}
module.exports = {
    /**
     * 
     * @param {Client} client 
     */
        onEnable : (client) => {
          setInterval(() => {
            for(let i = 0; i < l.length; i++){
                let user = l[i]
                tiktok = new WebcastPushConnection(user['idUser'])
                
                tiktok.connect().then(s =>{
                    console.log(s)
                    if(s['roomInfo']['title'] && ! isAlreadyOnLive[i]){
                        console.log("Nouveau Live")
                        isAlreadyOnLive[i] = 1

                        let embed = new Discord.EmbedBuilder()
                            .setDescription(user['idUser'] + " est en live !")
                            .setTitle(`Regarde par là : ${s['roomInfo']["title"]}`)
                            .setURL("https://www.tiktok.com/@" + user['idUser'] + "/live")
                        let guildList = db.prepare("SELECT idGuild, idChannel FROM Alerts JOIN Guilds USING(idGuild) WHERE idUser = ?;").all(user['idUser'])

                        for(const tuple of guildList){
                            console.log(tuple)
                            let guild = client.guilds.cache.get(tuple['idGuild'])
                            let channel = guild.channels.cache.get(tuple['idChannel'])
                            channel.send({embeds:[embed]})
                        }
                    }else {
                        console.log("Ancien Live")
                        isAlreadyOnLive[i] = 0
                    }
                }).catch(e => { 
                    console.log(l[i]['idUser'])
                    console.log(e)
                })
                try{
                    tiktok.disconnect()
                }catch(e)
                {
                    console.log(e)
                }                
            }
        }, 10*60*1000)    
    }
}