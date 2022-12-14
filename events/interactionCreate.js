const wait = require('node:timers/promises').setTimeout;


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName)
    
        if(!command) return;
    
        try {
            await command.execute(interaction);
        }  catch (err) {
            if(err) console.error(err);
    
            await interaction.reply({content: "An error occurred while executing that command, please contact the support team", ephemeral: true})
        }
    }
}
