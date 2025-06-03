const Discord = require("discord.js")
require('dotenv').config()
const client = new Discord.Client({ intents: Object.keys(Discord.GatewayIntentBits), partials: [Discord.Partials.Channel] })

let user = "nitroentacchini"

const { WebcastPushConnection } = require('tiktok-live-connector');
let test = new WebcastPushConnection(user)
client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log("connecté en tant que " + client.user.username + "#" + client.user.discriminator) //message de démarrage du bot
    const alert = require("./streamannouncer.js")
    console.log("lancement des alertes")
    alert.onEnable(client)
});
