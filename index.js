const { Client, Collection, Intents, MessageEmbed } = require("discord.js");

const { readdirSync } = require("fs");
const { Manager } = require("erela.js");
const { token, nodes } = require('./config.json')
const client = new Client({
    disableMentions: "everyone",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: Intents.ALL }
});
client.manager = new Manager({
        nodes,
        send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

  
readdirSync("./Events/").forEach(file => {
    const event = require(`./Events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Events Client ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
});

  
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('add this link in uptime')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  client.login(token);
