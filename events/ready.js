const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
require('dotenv').config();
const mongoose = require("mongoose")
//ready
module.exports = {
    name: "ready",
    once: true,
    async execute(client, commands) {
        console.log("Ready!")
        client.user.setActivity("Scaring you for eternity.")
        const CLIENT_ID = client.user.id 
    await mongoose.connect(
        process.env.DB, {
          keepAlive: true
        }
      )
        const rest = new REST({
            version: "9"
        }).setToken(process.env.TOKEN);
    
        (async () => {
            try {
                if(process.env.ENV === "production") {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    })
                    console.log("Registered commands globally")
                }
                else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                        body: commands
                    })
                    console.log("Registered commands locally")
                }
            }
            catch (err) {
                if(err){
                    console.error(err);
    
                }
            }
        })();
    }
}