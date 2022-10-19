const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Check your candy!"),

    async execute(interaction) {
        let udata = await User.findOne({id: interaction.user.id}) || await new User({id: interaction.user.id})

      if(udata.stage == 1 || udata.stage == 2) {
          let embed = new MessageEmbed()
          .setTitle("Your candy")
          .setDescription(`${udata.candy}`)
          .setColor("FFA500")
    
          interaction.reply({embeds: [embed]})

      }

    }
}