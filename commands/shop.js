const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")
const costumes = require("../costumes.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Check the costume shop!"),

    async execute(interaction) {
        let udata = await User.findOne({id: interaction.user.id}) || await new User({id: interaction.user.id})

      if(udata.stage == 1 || udata.stage == 2) {
          let embed = new MessageEmbed()
          .setTitle("Costume Shop")
          .addField("Ghost Costume", `${costumes.ghost.emoji} : ${costumes.ghost.Price} Candy`)
          .setColor("FFA500")
          interaction.reply({embeds: [embed]})

      }
      else if(udata.stage == 3){
        let embed = new MessageEmbed()
        .setTitle("Costume Shop")
        .setColor("FFFFFF")
        .addField("Ghost Costume", `${costumes.ghost.emoji} : ${costumes.ghost.Price * 1000} Souls`)
  
        interaction.reply({embeds: [embed]})
      }
      else if(udata.stage == 4){
        let embed = new MessageEmbed()
        .setTitle("...")
        .setColor("000000")
        .addField("GH0ST", `${costumes.ghost.AltEmote}`)
        .addField("...", "01110100 01101000 01100101 00100000 01100011 01101111 01100100 01100101 00100000 01101001 01110011 00100000 01100111 01101000 01101111 01110011 01110100")
  
        interaction.reply({embeds: [embed]})
      }

    }
}